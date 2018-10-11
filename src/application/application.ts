import { CoreClient } from '../client';
import { Stream } from '../client/stream';
import { handleAPIResponse } from '../util/api';
import { 
    EventData,
    ResultData, 
    ExecuteTaskReply, 
    StartServiceReply
} from '../client/core-client';

type Options = {
    client: CoreClient
}

class Application {
    // api gives access to low level gRPC calls
    api: CoreClient

    private client: CoreClient

    constructor(options: Options){
        this.client = options.client;
        this.api = this.client;
    }

    async whenEvent(event: Event, task: Task): Promise<Stream<EventData>> {
        await this.startService(event.serviceID);
        await this.startService(task.serviceID);

        event.dataFilter = event.dataFilter || ((key, data) => true);

        const stream = this.client.listenEvent({
            serviceID: event.serviceID,
            eventFilter: event.filter || '*'
        })
        stream.on('data', async ({ eventKey, eventData }) => {
            if (event.dataFilter(eventKey, eventData)) {
                await this.executeTask(task, eventKey, eventData);
            }
        });
        return stream;
    }

    async whenResult(result: Result, task: Task): Promise<Stream<ResultData>> {
        await this.startService(result.serviceID);
        await this.startService(task.serviceID);

        result.dataFilter = result.dataFilter || ((key, data) => true);

        const stream = this.client.listenResult({
            serviceID: result.serviceID,
            taskFilter: result.task || '*',
            outputFilter: result.output || '*'
        });
        stream.on('data', async ({ outputKey, outputData }) => {
            if (result.dataFilter(outputKey, outputData)) {
                await this.executeTask(task, outputKey, outputData);
            }
        });
        return stream;
    }

    private executeTask(task: Task, key: string, data: any): Promise<ExecuteTaskReply | Error> {
        return new Promise<ExecuteTaskReply | Error>((resolve, reject) => {
            const inputData = typeof task.inputs === 'function'
                ? task.inputs(key, JSON.parse(data))
                : task.inputs || {};

            this.client.executeTask({
                serviceID: task.serviceID,
                taskKey: task.taskKey,
                inputData: JSON.stringify(inputData)
            }, handleAPIResponse(resolve, reject));
        });
    }

    private async startService(id: string) {
        try {
            await new Promise<StartServiceReply | Error>((resolve, reject) => {
                this.client.startService({ serviceID: id }, handleAPIResponse(resolve, reject));
            });
        } catch (e) {
            throw new Error(`Error while starting service ${e}`)
        }
    }
}

type Event = {
    serviceID: string
    filter?: string
    dataFilter?: (type: string, data: Object) => boolean
}

type Result = {
    serviceID: string
    task?: string
    output?: string
    dataFilter?: (type: string, data: Object) => boolean
}

type Task = {
    serviceID: string
    taskKey: string
    inputs?: Object | ((inputType: string, inputData: Object) => Object)
}

export default Application;
export {
    Options,
    Event,
    Result,
    Task
}
