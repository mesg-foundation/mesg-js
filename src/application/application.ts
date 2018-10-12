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

        if (typeof event.filter === 'string') {
            console.warn("Please use eventKey in order to filter on a specific event");
            event.eventKey = event.filter;
            event.filter = null;
        }
        event.filter = event.filter || ((key, data) => true);

        const stream = this.client.listenEvent({
            serviceID: event.serviceID,
            eventFilter: event.eventKey || '*'
        })
        stream.on('data', async ({ eventKey, eventData }) => {
            const filter = event.filter as (type: string, data: Object) => boolean;
            if (filter(eventKey, JSON.parse(eventData))) {
                await this.executeTask(task, eventKey, eventData);
            }
        });
        return stream;
    }

    async whenResult(result: Result, task: Task): Promise<Stream<ResultData>> {
        await this.startService(result.serviceID);
        await this.startService(task.serviceID);

        result.filter = result.filter || ((key, data) => true);

        const stream = this.client.listenResult({
            serviceID: result.serviceID,
            taskFilter: result.taskKey || result.task || '*',
            outputFilter: result.outputKey || result.output || '*'
        });
        stream.on('data', async ({ outputKey, outputData }) => {
            if (result.filter(outputKey, JSON.parse(outputData))) {
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
    filter?: string | ((type: string, data: Object) => boolean)
    eventKey?: string
}

type Result = {
    serviceID: string
    task?: string
    taskKey?: string
    output?: string
    outputKey?: string
    filter?: (type: string, data: Object) => boolean
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
