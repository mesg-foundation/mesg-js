// package: api
// file: api-core.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as api_core_pb from "./api-core_pb";

interface ICoreService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    listenEvent: ICoreService_IListenEvent;
    listenResult: ICoreService_IListenResult;
    executeTask: ICoreService_IExecuteTask;
    startService: ICoreService_IStartService;
    stopService: ICoreService_IStopService;
    deployService: ICoreService_IDeployService;
    deleteService: ICoreService_IDeleteService;
    listServices: ICoreService_IListServices;
    getService: ICoreService_IGetService;
    serviceLogs: ICoreService_IServiceLogs;
    createWorkflow: ICoreService_ICreateWorkflow;
    deleteWorkflow: ICoreService_IDeleteWorkflow;
}

interface ICoreService_IListenEvent extends grpc.MethodDefinition<api_core_pb.ListenEventRequest, api_core_pb.EventData> {
    path: string; // "/api.Core/ListenEvent"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<api_core_pb.ListenEventRequest>;
    requestDeserialize: grpc.deserialize<api_core_pb.ListenEventRequest>;
    responseSerialize: grpc.serialize<api_core_pb.EventData>;
    responseDeserialize: grpc.deserialize<api_core_pb.EventData>;
}
interface ICoreService_IListenResult extends grpc.MethodDefinition<api_core_pb.ListenResultRequest, api_core_pb.ResultData> {
    path: string; // "/api.Core/ListenResult"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<api_core_pb.ListenResultRequest>;
    requestDeserialize: grpc.deserialize<api_core_pb.ListenResultRequest>;
    responseSerialize: grpc.serialize<api_core_pb.ResultData>;
    responseDeserialize: grpc.deserialize<api_core_pb.ResultData>;
}
interface ICoreService_IExecuteTask extends grpc.MethodDefinition<api_core_pb.ExecuteTaskRequest, api_core_pb.ExecuteTaskReply> {
    path: string; // "/api.Core/ExecuteTask"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_core_pb.ExecuteTaskRequest>;
    requestDeserialize: grpc.deserialize<api_core_pb.ExecuteTaskRequest>;
    responseSerialize: grpc.serialize<api_core_pb.ExecuteTaskReply>;
    responseDeserialize: grpc.deserialize<api_core_pb.ExecuteTaskReply>;
}
interface ICoreService_IStartService extends grpc.MethodDefinition<api_core_pb.StartServiceRequest, api_core_pb.StartServiceReply> {
    path: string; // "/api.Core/StartService"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_core_pb.StartServiceRequest>;
    requestDeserialize: grpc.deserialize<api_core_pb.StartServiceRequest>;
    responseSerialize: grpc.serialize<api_core_pb.StartServiceReply>;
    responseDeserialize: grpc.deserialize<api_core_pb.StartServiceReply>;
}
interface ICoreService_IStopService extends grpc.MethodDefinition<api_core_pb.StopServiceRequest, api_core_pb.StopServiceReply> {
    path: string; // "/api.Core/StopService"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_core_pb.StopServiceRequest>;
    requestDeserialize: grpc.deserialize<api_core_pb.StopServiceRequest>;
    responseSerialize: grpc.serialize<api_core_pb.StopServiceReply>;
    responseDeserialize: grpc.deserialize<api_core_pb.StopServiceReply>;
}
interface ICoreService_IDeployService extends grpc.MethodDefinition<api_core_pb.DeployServiceRequest, api_core_pb.DeployServiceReply> {
    path: string; // "/api.Core/DeployService"
    requestStream: boolean; // true
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<api_core_pb.DeployServiceRequest>;
    requestDeserialize: grpc.deserialize<api_core_pb.DeployServiceRequest>;
    responseSerialize: grpc.serialize<api_core_pb.DeployServiceReply>;
    responseDeserialize: grpc.deserialize<api_core_pb.DeployServiceReply>;
}
interface ICoreService_IDeleteService extends grpc.MethodDefinition<api_core_pb.DeleteServiceRequest, api_core_pb.DeleteServiceReply> {
    path: string; // "/api.Core/DeleteService"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_core_pb.DeleteServiceRequest>;
    requestDeserialize: grpc.deserialize<api_core_pb.DeleteServiceRequest>;
    responseSerialize: grpc.serialize<api_core_pb.DeleteServiceReply>;
    responseDeserialize: grpc.deserialize<api_core_pb.DeleteServiceReply>;
}
interface ICoreService_IListServices extends grpc.MethodDefinition<api_core_pb.ListServicesRequest, api_core_pb.ListServicesReply> {
    path: string; // "/api.Core/ListServices"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_core_pb.ListServicesRequest>;
    requestDeserialize: grpc.deserialize<api_core_pb.ListServicesRequest>;
    responseSerialize: grpc.serialize<api_core_pb.ListServicesReply>;
    responseDeserialize: grpc.deserialize<api_core_pb.ListServicesReply>;
}
interface ICoreService_IGetService extends grpc.MethodDefinition<api_core_pb.GetServiceRequest, api_core_pb.GetServiceReply> {
    path: string; // "/api.Core/GetService"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_core_pb.GetServiceRequest>;
    requestDeserialize: grpc.deserialize<api_core_pb.GetServiceRequest>;
    responseSerialize: grpc.serialize<api_core_pb.GetServiceReply>;
    responseDeserialize: grpc.deserialize<api_core_pb.GetServiceReply>;
}
interface ICoreService_IServiceLogs extends grpc.MethodDefinition<api_core_pb.ServiceLogsRequest, api_core_pb.LogData> {
    path: string; // "/api.Core/ServiceLogs"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<api_core_pb.ServiceLogsRequest>;
    requestDeserialize: grpc.deserialize<api_core_pb.ServiceLogsRequest>;
    responseSerialize: grpc.serialize<api_core_pb.LogData>;
    responseDeserialize: grpc.deserialize<api_core_pb.LogData>;
}
interface ICoreService_ICreateWorkflow extends grpc.MethodDefinition<api_core_pb.CreateWorkflowRequest, api_core_pb.CreateWorkflowReply> {
    path: string; // "/api.Core/CreateWorkflow"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_core_pb.CreateWorkflowRequest>;
    requestDeserialize: grpc.deserialize<api_core_pb.CreateWorkflowRequest>;
    responseSerialize: grpc.serialize<api_core_pb.CreateWorkflowReply>;
    responseDeserialize: grpc.deserialize<api_core_pb.CreateWorkflowReply>;
}
interface ICoreService_IDeleteWorkflow extends grpc.MethodDefinition<api_core_pb.DeleteWorkflowRequest, api_core_pb.DeleteWorkflowReply> {
    path: string; // "/api.Core/DeleteWorkflow"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_core_pb.DeleteWorkflowRequest>;
    requestDeserialize: grpc.deserialize<api_core_pb.DeleteWorkflowRequest>;
    responseSerialize: grpc.serialize<api_core_pb.DeleteWorkflowReply>;
    responseDeserialize: grpc.deserialize<api_core_pb.DeleteWorkflowReply>;
}

export const CoreService: ICoreService;

export interface ICoreServer {
    listenEvent: grpc.handleServerStreamingCall<api_core_pb.ListenEventRequest, api_core_pb.EventData>;
    listenResult: grpc.handleServerStreamingCall<api_core_pb.ListenResultRequest, api_core_pb.ResultData>;
    executeTask: grpc.handleUnaryCall<api_core_pb.ExecuteTaskRequest, api_core_pb.ExecuteTaskReply>;
    startService: grpc.handleUnaryCall<api_core_pb.StartServiceRequest, api_core_pb.StartServiceReply>;
    stopService: grpc.handleUnaryCall<api_core_pb.StopServiceRequest, api_core_pb.StopServiceReply>;
    deployService: grpc.handleBidiStreamingCall<api_core_pb.DeployServiceRequest, api_core_pb.DeployServiceReply>;
    deleteService: grpc.handleUnaryCall<api_core_pb.DeleteServiceRequest, api_core_pb.DeleteServiceReply>;
    listServices: grpc.handleUnaryCall<api_core_pb.ListServicesRequest, api_core_pb.ListServicesReply>;
    getService: grpc.handleUnaryCall<api_core_pb.GetServiceRequest, api_core_pb.GetServiceReply>;
    serviceLogs: grpc.handleServerStreamingCall<api_core_pb.ServiceLogsRequest, api_core_pb.LogData>;
    createWorkflow: grpc.handleUnaryCall<api_core_pb.CreateWorkflowRequest, api_core_pb.CreateWorkflowReply>;
    deleteWorkflow: grpc.handleUnaryCall<api_core_pb.DeleteWorkflowRequest, api_core_pb.DeleteWorkflowReply>;
}

export interface ICoreClient {
    listenEvent(request: api_core_pb.ListenEventRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_core_pb.EventData>;
    listenEvent(request: api_core_pb.ListenEventRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_core_pb.EventData>;
    listenResult(request: api_core_pb.ListenResultRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_core_pb.ResultData>;
    listenResult(request: api_core_pb.ListenResultRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_core_pb.ResultData>;
    executeTask(request: api_core_pb.ExecuteTaskRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.ExecuteTaskReply) => void): grpc.ClientUnaryCall;
    executeTask(request: api_core_pb.ExecuteTaskRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.ExecuteTaskReply) => void): grpc.ClientUnaryCall;
    executeTask(request: api_core_pb.ExecuteTaskRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.ExecuteTaskReply) => void): grpc.ClientUnaryCall;
    startService(request: api_core_pb.StartServiceRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.StartServiceReply) => void): grpc.ClientUnaryCall;
    startService(request: api_core_pb.StartServiceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.StartServiceReply) => void): grpc.ClientUnaryCall;
    startService(request: api_core_pb.StartServiceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.StartServiceReply) => void): grpc.ClientUnaryCall;
    stopService(request: api_core_pb.StopServiceRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.StopServiceReply) => void): grpc.ClientUnaryCall;
    stopService(request: api_core_pb.StopServiceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.StopServiceReply) => void): grpc.ClientUnaryCall;
    stopService(request: api_core_pb.StopServiceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.StopServiceReply) => void): grpc.ClientUnaryCall;
    deployService(): grpc.ClientDuplexStream<api_core_pb.DeployServiceRequest, api_core_pb.DeployServiceReply>;
    deployService(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<api_core_pb.DeployServiceRequest, api_core_pb.DeployServiceReply>;
    deployService(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<api_core_pb.DeployServiceRequest, api_core_pb.DeployServiceReply>;
    deleteService(request: api_core_pb.DeleteServiceRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.DeleteServiceReply) => void): grpc.ClientUnaryCall;
    deleteService(request: api_core_pb.DeleteServiceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.DeleteServiceReply) => void): grpc.ClientUnaryCall;
    deleteService(request: api_core_pb.DeleteServiceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.DeleteServiceReply) => void): grpc.ClientUnaryCall;
    listServices(request: api_core_pb.ListServicesRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.ListServicesReply) => void): grpc.ClientUnaryCall;
    listServices(request: api_core_pb.ListServicesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.ListServicesReply) => void): grpc.ClientUnaryCall;
    listServices(request: api_core_pb.ListServicesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.ListServicesReply) => void): grpc.ClientUnaryCall;
    getService(request: api_core_pb.GetServiceRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.GetServiceReply) => void): grpc.ClientUnaryCall;
    getService(request: api_core_pb.GetServiceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.GetServiceReply) => void): grpc.ClientUnaryCall;
    getService(request: api_core_pb.GetServiceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.GetServiceReply) => void): grpc.ClientUnaryCall;
    serviceLogs(request: api_core_pb.ServiceLogsRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_core_pb.LogData>;
    serviceLogs(request: api_core_pb.ServiceLogsRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_core_pb.LogData>;
    createWorkflow(request: api_core_pb.CreateWorkflowRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.CreateWorkflowReply) => void): grpc.ClientUnaryCall;
    createWorkflow(request: api_core_pb.CreateWorkflowRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.CreateWorkflowReply) => void): grpc.ClientUnaryCall;
    createWorkflow(request: api_core_pb.CreateWorkflowRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.CreateWorkflowReply) => void): grpc.ClientUnaryCall;
    deleteWorkflow(request: api_core_pb.DeleteWorkflowRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.DeleteWorkflowReply) => void): grpc.ClientUnaryCall;
    deleteWorkflow(request: api_core_pb.DeleteWorkflowRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.DeleteWorkflowReply) => void): grpc.ClientUnaryCall;
    deleteWorkflow(request: api_core_pb.DeleteWorkflowRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.DeleteWorkflowReply) => void): grpc.ClientUnaryCall;
}

export class CoreClient extends grpc.Client implements ICoreClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public listenEvent(request: api_core_pb.ListenEventRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_core_pb.EventData>;
    public listenEvent(request: api_core_pb.ListenEventRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_core_pb.EventData>;
    public listenResult(request: api_core_pb.ListenResultRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_core_pb.ResultData>;
    public listenResult(request: api_core_pb.ListenResultRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_core_pb.ResultData>;
    public executeTask(request: api_core_pb.ExecuteTaskRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.ExecuteTaskReply) => void): grpc.ClientUnaryCall;
    public executeTask(request: api_core_pb.ExecuteTaskRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.ExecuteTaskReply) => void): grpc.ClientUnaryCall;
    public executeTask(request: api_core_pb.ExecuteTaskRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.ExecuteTaskReply) => void): grpc.ClientUnaryCall;
    public startService(request: api_core_pb.StartServiceRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.StartServiceReply) => void): grpc.ClientUnaryCall;
    public startService(request: api_core_pb.StartServiceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.StartServiceReply) => void): grpc.ClientUnaryCall;
    public startService(request: api_core_pb.StartServiceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.StartServiceReply) => void): grpc.ClientUnaryCall;
    public stopService(request: api_core_pb.StopServiceRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.StopServiceReply) => void): grpc.ClientUnaryCall;
    public stopService(request: api_core_pb.StopServiceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.StopServiceReply) => void): grpc.ClientUnaryCall;
    public stopService(request: api_core_pb.StopServiceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.StopServiceReply) => void): grpc.ClientUnaryCall;
    public deployService(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<api_core_pb.DeployServiceRequest, api_core_pb.DeployServiceReply>;
    public deployService(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<api_core_pb.DeployServiceRequest, api_core_pb.DeployServiceReply>;
    public deleteService(request: api_core_pb.DeleteServiceRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.DeleteServiceReply) => void): grpc.ClientUnaryCall;
    public deleteService(request: api_core_pb.DeleteServiceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.DeleteServiceReply) => void): grpc.ClientUnaryCall;
    public deleteService(request: api_core_pb.DeleteServiceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.DeleteServiceReply) => void): grpc.ClientUnaryCall;
    public listServices(request: api_core_pb.ListServicesRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.ListServicesReply) => void): grpc.ClientUnaryCall;
    public listServices(request: api_core_pb.ListServicesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.ListServicesReply) => void): grpc.ClientUnaryCall;
    public listServices(request: api_core_pb.ListServicesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.ListServicesReply) => void): grpc.ClientUnaryCall;
    public getService(request: api_core_pb.GetServiceRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.GetServiceReply) => void): grpc.ClientUnaryCall;
    public getService(request: api_core_pb.GetServiceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.GetServiceReply) => void): grpc.ClientUnaryCall;
    public getService(request: api_core_pb.GetServiceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.GetServiceReply) => void): grpc.ClientUnaryCall;
    public serviceLogs(request: api_core_pb.ServiceLogsRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_core_pb.LogData>;
    public serviceLogs(request: api_core_pb.ServiceLogsRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_core_pb.LogData>;
    public createWorkflow(request: api_core_pb.CreateWorkflowRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.CreateWorkflowReply) => void): grpc.ClientUnaryCall;
    public createWorkflow(request: api_core_pb.CreateWorkflowRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.CreateWorkflowReply) => void): grpc.ClientUnaryCall;
    public createWorkflow(request: api_core_pb.CreateWorkflowRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.CreateWorkflowReply) => void): grpc.ClientUnaryCall;
    public deleteWorkflow(request: api_core_pb.DeleteWorkflowRequest, callback: (error: grpc.ServiceError | null, response: api_core_pb.DeleteWorkflowReply) => void): grpc.ClientUnaryCall;
    public deleteWorkflow(request: api_core_pb.DeleteWorkflowRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_core_pb.DeleteWorkflowReply) => void): grpc.ClientUnaryCall;
    public deleteWorkflow(request: api_core_pb.DeleteWorkflowRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_core_pb.DeleteWorkflowReply) => void): grpc.ClientUnaryCall;
}
