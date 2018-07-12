import * as grpc from 'grpc'
import { Stream } from './stream'

interface ServiceClient extends grpc.Client {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    emitEvent(request: EmitEventRequest, cb: (err: Error, data: EmitEventReply) => void) 
    listenTask(request: ListenTaskRequest): Stream<TaskData>
    submitResult(request: SubmitResultRequest, cb: (err: Error, data: SubmitResultReply) => void) 
}

interface TaskData {
    executionID: string
    taskKey: string
    inputData: string
}

interface EmitEventRequest {
    token: string
    eventKey: string
    eventData: string
}

interface ListenTaskRequest {
    token: string
}

interface SubmitResultRequest {
    executionID: string
    outputKey: string
    outputData: string
}

interface EmitEventReply {
}

interface SubmitResultReply {
}

export default ServiceClient;
export {
    EmitEventRequest,
    ListenTaskRequest,
    SubmitResultRequest,
    EmitEventReply,
    SubmitResultReply,
    TaskData
}