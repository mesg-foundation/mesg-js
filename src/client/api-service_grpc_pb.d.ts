// package: api
// file: api-service.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as api_service_pb from "./api-service_pb";

interface IServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    emitEvent: IServiceService_IEmitEvent;
    listenTask: IServiceService_IListenTask;
    submitResult: IServiceService_ISubmitResult;
}

interface IServiceService_IEmitEvent extends grpc.MethodDefinition<api_service_pb.EmitEventRequest, api_service_pb.EmitEventReply> {
    path: string; // "/api.Service/EmitEvent"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_service_pb.EmitEventRequest>;
    requestDeserialize: grpc.deserialize<api_service_pb.EmitEventRequest>;
    responseSerialize: grpc.serialize<api_service_pb.EmitEventReply>;
    responseDeserialize: grpc.deserialize<api_service_pb.EmitEventReply>;
}
interface IServiceService_IListenTask extends grpc.MethodDefinition<api_service_pb.ListenTaskRequest, api_service_pb.TaskData> {
    path: string; // "/api.Service/ListenTask"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<api_service_pb.ListenTaskRequest>;
    requestDeserialize: grpc.deserialize<api_service_pb.ListenTaskRequest>;
    responseSerialize: grpc.serialize<api_service_pb.TaskData>;
    responseDeserialize: grpc.deserialize<api_service_pb.TaskData>;
}
interface IServiceService_ISubmitResult extends grpc.MethodDefinition<api_service_pb.SubmitResultRequest, api_service_pb.SubmitResultReply> {
    path: string; // "/api.Service/SubmitResult"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_service_pb.SubmitResultRequest>;
    requestDeserialize: grpc.deserialize<api_service_pb.SubmitResultRequest>;
    responseSerialize: grpc.serialize<api_service_pb.SubmitResultReply>;
    responseDeserialize: grpc.deserialize<api_service_pb.SubmitResultReply>;
}

export const ServiceService: IServiceService;

export interface IServiceServer {
    emitEvent: grpc.handleUnaryCall<api_service_pb.EmitEventRequest, api_service_pb.EmitEventReply>;
    listenTask: grpc.handleServerStreamingCall<api_service_pb.ListenTaskRequest, api_service_pb.TaskData>;
    submitResult: grpc.handleUnaryCall<api_service_pb.SubmitResultRequest, api_service_pb.SubmitResultReply>;
}

export interface IServiceClient {
    emitEvent(request: api_service_pb.EmitEventRequest, callback: (error: grpc.ServiceError | null, response: api_service_pb.EmitEventReply) => void): grpc.ClientUnaryCall;
    emitEvent(request: api_service_pb.EmitEventRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_service_pb.EmitEventReply) => void): grpc.ClientUnaryCall;
    emitEvent(request: api_service_pb.EmitEventRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_service_pb.EmitEventReply) => void): grpc.ClientUnaryCall;
    listenTask(request: api_service_pb.ListenTaskRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_service_pb.TaskData>;
    listenTask(request: api_service_pb.ListenTaskRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_service_pb.TaskData>;
    submitResult(request: api_service_pb.SubmitResultRequest, callback: (error: grpc.ServiceError | null, response: api_service_pb.SubmitResultReply) => void): grpc.ClientUnaryCall;
    submitResult(request: api_service_pb.SubmitResultRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_service_pb.SubmitResultReply) => void): grpc.ClientUnaryCall;
    submitResult(request: api_service_pb.SubmitResultRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_service_pb.SubmitResultReply) => void): grpc.ClientUnaryCall;
}

export class ServiceClient extends grpc.Client implements IServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public emitEvent(request: api_service_pb.EmitEventRequest, callback: (error: grpc.ServiceError | null, response: api_service_pb.EmitEventReply) => void): grpc.ClientUnaryCall;
    public emitEvent(request: api_service_pb.EmitEventRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_service_pb.EmitEventReply) => void): grpc.ClientUnaryCall;
    public emitEvent(request: api_service_pb.EmitEventRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_service_pb.EmitEventReply) => void): grpc.ClientUnaryCall;
    public listenTask(request: api_service_pb.ListenTaskRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_service_pb.TaskData>;
    public listenTask(request: api_service_pb.ListenTaskRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<api_service_pb.TaskData>;
    public submitResult(request: api_service_pb.SubmitResultRequest, callback: (error: grpc.ServiceError | null, response: api_service_pb.SubmitResultReply) => void): grpc.ClientUnaryCall;
    public submitResult(request: api_service_pb.SubmitResultRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_service_pb.SubmitResultReply) => void): grpc.ClientUnaryCall;
    public submitResult(request: api_service_pb.SubmitResultRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_service_pb.SubmitResultReply) => void): grpc.ClientUnaryCall;
}
