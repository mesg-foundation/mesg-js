import { ServiceClient } from '../client';
import { Stream } from '../client/stream';
import { handleAPIResponse } from '../util/api';
import {
    TaskData,
    SubmitResultReply,
    EmitEventReply
} from '../client/service-client';

type Options = {
    token: string
    mesgConfig: any
    client: ServiceClient
}

class Service {
    private token: string
    private client: ServiceClient
    private mesgConfig: any
    private tasks: Tasks

    constructor(options: Options){
        this.mesgConfig = options.mesgConfig;
        this.client = options.client;
        this.token = options.token;
    }

    listenTask({ ...tasks }: Tasks): Stream<TaskData> {
        if (this.tasks) {
            throw new Error(`listenTask should be called only once`);
        }
        this.tasks = tasks;
        this.validateTaskNames();
        const stream = this.client.listenTask({ token: this.token });
        stream.on('data', this.handleTaskData.bind(this));
        return stream;
    }

    emitEvent(event: string, data: any): Promise<EmitEventReply | Error> {
        return new Promise<EmitEventReply | Error>((resolve, reject) => {
            this.client.emitEvent({
                token: this.token,
                eventKey: event,
                eventData: JSON.stringify(data)
            }, handleAPIResponse(resolve, reject));
        })
    }

    private handleTaskData({ executionID, taskKey, inputData }) {
        const callback = this.tasks[taskKey];
        if (!callback) {
          throw new Error(`Task ${taskKey} is not defined in your services`);
        }

        const data = JSON.parse(inputData);
        const outputs = {};
        const taskConfig = this.mesgConfig.tasks[taskKey];

        for (let outputKey in taskConfig.outputs){
            outputs[outputKey] = (data: TaskOutputCallbackInput): Promise<SubmitResultReply | Error> => {
                return new Promise<SubmitResultReply | Error>((resolve, reject) => {
                    this.client.submitResult({
                        executionID,
                        outputKey,
                        outputData: JSON.stringify(data)
                    }, handleAPIResponse(resolve, reject));
                })
            }
        }

        callback(data, outputs);
    }

    private validateTaskNames(){
        const nonDescribedTasks = Object.keys(this.tasks).filter(x => !this.mesgConfig.tasks[x]);
        if (nonDescribedTasks.length > 0){
            throw new Error(`The following tasks does not present in your mesg.yml: ${nonDescribedTasks.join(', ')}`);
        }
        const nonHandledTasks = Object.keys(this.mesgConfig.tasks).filter(x => !this.tasks[x]);
        if (nonHandledTasks.length > 0){
            throw new Error(`The following tasks described in your mesg.yml don't have callbacks: ${nonHandledTasks.join(', ')}`);
        }
    }
}

interface Tasks {
    [task: string]: (inputs: TaskInputs, outputs: TaskOutputs) => void
}

interface TaskInputs {
    [key: string]: any
}

interface TaskOutputs  {
    [key: string]: (input: TaskOutputCallbackInput) => Promise<void>
}

interface TaskOutputCallbackInput {
    [key: string]: any
}

export default Service;
export {
    Options,
    Tasks,
    TaskInputs,
    TaskOutputs,
    TaskOutputCallbackInput
}
