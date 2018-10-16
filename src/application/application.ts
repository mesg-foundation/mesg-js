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
            const filter = event.filter as (eventKey: string, eventData: Object) => boolean;
            if (filter(eventKey, JSON.parse(eventData))) {
                const inputData = typeof task.inputs != 'function'
                    ? task.inputs || {}
                    : (<(eventKey: string, eventData: Object) => Object>task.inputs)(
                        eventKey,
                        JSON.parse(eventData),
                    );
                await this.executeTask(task, inputData);
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
            outputFilter: result.outputKey || result.output || '*',
            tagFilters: result.tagFilters || []
        });
        stream.on('data', async ({ outputKey, outputData, taskKey, executionTags }) => {
            if (result.filter(outputKey, JSON.parse(outputData), taskKey, executionTags)) {
                const inputData = typeof task.inputs != 'function'
                    ? task.inputs || {}
                    : (<(outputKey: string, outputData: Object, taskKey: string, tags: string[]) => Object>task.inputs)(
                        outputKey,
                        JSON.parse(outputData),
                        taskKey,
                        executionTags
                    )
                await this.executeTask(task, inputData);
            }
        });
        return stream;
    }

    private executeTask(task: Task, inputs: Object): Promise<ExecuteTaskReply | Error> {
        return new Promise<ExecuteTaskReply | Error>((resolve, reject) => {
            this.client.executeTask({
                serviceID: task.serviceID,
                taskKey: task.taskKey,
                inputData: JSON.stringify(inputs),
                executionTags: task.tags || []
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
    // TODO: deprecate string | in future.
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

    // tagFilters is a list of tagExecutions to filter.
    tagFilters?: string[]

    // filter callback func is used to filter task results by output key, output data, task key and/or tags.
    // task execution only will be made when filter returned with a true.
    filter?: (outputKey: string, outputData: Object, taskKey?: string, tags?: string[]) => boolean
}

type Task = {
    // serviceID is service's ID.
    serviceID: string

    // taskKey is task's key.
    taskKey: string

    // tags is a list of tags associated to an execution
    tags?: string[]

    // inputs is the task's input data.
    // it can directly get an object as value or a callback func to dynamically
    // functions are depending of your incoming data
    // events: The function will have the eventKey and the eventData
    // results: The function will have the outputKey, the outputData, the taskKey and the list of tags for this execution
    inputs?: Object | 
        ((eventKey: string, eventData: Object) => Object) | 
        ((outputKey: string, outputData: Object, taskKey: string, tags: string[]) => Object)
}

export default Application;
export {
    Options,
    Event,
    Result,
    Task
}
