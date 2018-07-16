import * as grpc from 'grpc'
import { Service } from './service'
import { Stream } from './stream'

interface CoreClient extends grpc.Client {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    listenEvent(request: ListenEventRequest): Stream<EventData>
    executeTask(request: ExecuteTaskRequest, cb: (err: Error, data: ExecuteTaskReply) => void)
    listenResult(request: ListenResultRequest): Stream<ResultData>
    startService(request: StartServiceRequest, cb: (err: Error, data: StartServiceReply) => void)
    stopService(request: StopServiceRequest, cb: (err: Error, data: StopServiceReply) => void) 
    deployService(request: DeployServiceRequest, cb: (err: Error, data: DeployServiceReply) => void) 
    deleteService(request: DeleteServiceRequest, cb: (err: Error, data: DeleteServiceReply) => void) 
    listServices(request: ListServicesRequest, cb: (err: Error, data: ListServicesReply) => void) 
    getService(request: GetServiceRequest, cb: (err: Error, data: GetServiceReply) => void) 
}

interface ListenEventRequest {
    serviceID: string
    eventFilter: string
}

interface ExecuteTaskRequest {
    serviceID: string
    taskKey: string
    inputData: string
}

interface ListenResultRequest {
    serviceID: string
    taskFilter: string
    outputFilter: string
}

interface StartServiceRequest {
    serviceID: string
}

interface StopServiceRequest {
    serviceID: string
}

interface EventData {
    eventKey: string
    eventData: string
}

interface ExecuteTaskReply {
    executionID: string
}

interface ResultData {
    executionID: string
    taskKey: string
    outputKey: string
    outputData: string
}

interface StartServiceReply {
}

interface StopServiceReply {
}

interface DeployServiceRequest {
    service: Service
}

interface DeployServiceReply {
    serviceID: string
}

interface DeleteServiceRequest {
    serviceID: string
}

interface DeleteServiceReply {
}

interface ListServicesRequest {
}

interface ListServicesReply {
    services: Service[]
}

interface GetServiceRequest {
    serviceID: string
}

interface GetServiceReply {
    service: Service
}

export default CoreClient;
export {
    ListenEventRequest,
    ExecuteTaskRequest,
    ListenResultRequest,
    StartServiceRequest,
    StopServiceRequest,
    DeployServiceRequest,
    DeleteServiceRequest,
    ListServicesRequest,
    GetServiceRequest,
    ExecuteTaskReply,
    StartServiceReply,
    StopServiceReply,
    DeployServiceReply,
    DeleteServiceReply,
    ListServicesReply,
    GetServiceReply,
    ResultData,
    EventData,
}