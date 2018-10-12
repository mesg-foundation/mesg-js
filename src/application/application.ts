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

        event.dataFilter = event.dataFilter || ((eventKey, eventData) => true);

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

        result.dataFilter = result.dataFilter || ((outputKey, outputData) => true);

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
    // serviceID is service's ID.
    serviceID: string

    // filter is event key filter.
    filter?: string

    // dataFilter callback func is used to filter events by event key and
    // event data before continuing to execute the task.
    // task execution only will be made when filter returned with a true.
    dataFilter?: (eventKey: string, eventData: Object) => boolean
}

type Result = {
    // serviceID is service's ID.
    serviceID: string

    // task is task key filter.
    task?: string

    // output is output key filter.
    output?: string

    // dataFilter callback func is used to filter task results by output key and
    // output data before continuing to execute the task.
    // task execution only will be made when filter returned with a true.
    dataFilter?: (outputKey: string, outputData: Object) => boolean
}

type Task = {
    // serviceID is service's ID.
    serviceID: string

    // taskKey is task's key.
    taskKey: string

    // inputs is the task's input data.
    // it can directly get an object as value or a callback func to dynamically
    // set the inputs depending on relevant event data or task result.
    // key can be event key or output key.
    // data can be event data or output data.
    inputs?: Object | ((key: string, data: Object) => Object)
}

export default Application;
export {
    Options,
    Event,
    Result,
    Task
}
