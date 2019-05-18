import { Stream } from '../util/grpc';
declare type Options = {
    client: any;
};
declare class Application {
    api: any;
    constructor(options: Options);
    listenEvent(req: ListenEventRequest): Stream<EventData>;
    listenResult(req: ListenResultRequest): Stream<ResultData>;
    executeTask(req: ExecuteTaskRequest): Promise<ExecuteTaskReply>;
    executeTaskAndWaitResult(req: ExecuteTaskRequest): Promise<ResultData>;
}
interface ListenEventRequest {
    serviceID: string;
    eventFilter?: string;
}
interface ListenResultRequest {
    serviceID: string;
    taskFilter?: string;
    outputFilter?: string;
    tagFilters?: string[];
}
interface EventData {
    eventKey: string;
    eventData: string;
}
interface ResultData {
    executionID: string;
    taskKey: string;
    outputKey: string;
    outputData: string;
    executionTags: string[];
    error: string;
}
interface ExecuteTaskRequest {
    serviceID: string;
    taskKey: string;
    inputData: string;
    executionTags?: string[];
}
interface ExecuteTaskReply {
    executionID: string;
}
export default Application;
export { Options, Stream, ListenEventRequest, ExecuteTaskRequest, ExecuteTaskReply, ListenResultRequest, EventData, ResultData };
