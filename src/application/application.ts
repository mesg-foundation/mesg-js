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
        event.filter = event.filter || ((eventKey, eventData) => true);

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

        result.filter = result.filter || ((outputKey, outputData) => true);
        
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
            const inputData = typeof task.inputs == 'function'
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
    
    // eventKey is event key filter.
    eventKey?: string

    // filter callback func is used to filter events by event key and
    // event data before continuing to execute the task.
    // task execution only will be made when filter returned with a true.
    filter?: string | ((eventKey: string, eventData: Object) => boolean)
}

type Result = {
    // serviceID is service's ID.
    serviceID: string

    // DEPRECATED: Please use taskKey instead
    task?: string

    // taskKey is task key filter.
    taskKey?: string

    // DEPRECATED: Please use outputKey instead
    output?: string

    // outputKey is output key filter.
    outputKey?: string

    // filter callback func is used to filter task results by output key and
    // output data before continuing to execute the task.
    // task execution only will be made when filter returned with a true.
    filter?: (outputKey: string, outputData: Object) => boolean
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
