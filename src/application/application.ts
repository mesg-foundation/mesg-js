import { handleAPIResponse } from '../util/api';

type Options = {
    client
}

class Application {
    // api gives access to low level gRPC calls.
    api

    constructor(options: Options){
        this.api = options.client;
    }

    listenEvent(req: ListenEventRequest): Stream<EventData> {
        return this.api.ListenEvent(req)
    }

    listenResult(req: ListenResultRequest): Stream<ResultData> {
        return this.api.ListenResult(req)
    }

    executeTask(req: ExecuteTaskRequest): Promise<ExecuteTaskReply> {
        return new Promise<ExecuteTaskReply>((resolve, reject) => {
            this.api.ExecuteTask(req, handleAPIResponse(resolve, reject))
        })
    }
}

declare interface Stream<T> {
    on(event: 'data', listener: (data: T) => void): this;
    on(event: 'end', listener: () => void): this;
    on(event: 'error', listener: (e) => void): this;
    on(event: 'status', listener: (status) => void): this;
}

interface ListenEventRequest {
    serviceID: string
    eventFilter?: string
}

interface ListenResultRequest {
    serviceID: string
    taskFilter?: string
    outputFilter?: string
    tagFilters?: string[]
}

interface EventData {
    eventKey: string
    eventData: string
}

interface ResultData {
    executionID: string
    taskKey: string
    outputKey: string
    outputData: string
    executionTags: string[]
    error: string
}

interface ExecuteTaskRequest {
    serviceID: string
    taskKey: string
    inputData: string
    executionTags?: string[]
}

interface ExecuteTaskReply {
    executionID: string
}

export default Application;
export {
    Options,
    Stream,
    ListenEventRequest,
    ExecuteTaskRequest,
    ExecuteTaskReply,
    ListenResultRequest,
    EventData,
    ResultData
}
