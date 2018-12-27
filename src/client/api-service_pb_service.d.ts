// package: api
// file: api-service.proto

import * as api_service_pb from "./api-service_pb";
import {grpc} from "grpc-web-client";

type ServiceEmitEvent = {
  readonly methodName: string;
  readonly service: typeof Service;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_service_pb.EmitEventRequest;
  readonly responseType: typeof api_service_pb.EmitEventReply;
};

type ServiceListenTask = {
  readonly methodName: string;
  readonly service: typeof Service;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_service_pb.ListenTaskRequest;
  readonly responseType: typeof api_service_pb.TaskData;
};

type ServiceSubmitResult = {
  readonly methodName: string;
  readonly service: typeof Service;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_service_pb.SubmitResultRequest;
  readonly responseType: typeof api_service_pb.SubmitResultReply;
};

export class Service {
  static readonly serviceName: string;
  static readonly EmitEvent: ServiceEmitEvent;
  static readonly ListenTask: ServiceListenTask;
  static readonly SubmitResult: ServiceSubmitResult;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: () => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: () => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  emitEvent(
    requestMessage: api_service_pb.EmitEventRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_service_pb.EmitEventReply|null) => void
  ): UnaryResponse;
  emitEvent(
    requestMessage: api_service_pb.EmitEventRequest,
    callback: (error: ServiceError|null, responseMessage: api_service_pb.EmitEventReply|null) => void
  ): UnaryResponse;
  listenTask(requestMessage: api_service_pb.ListenTaskRequest, metadata?: grpc.Metadata): ResponseStream<api_service_pb.TaskData>;
  submitResult(
    requestMessage: api_service_pb.SubmitResultRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: api_service_pb.SubmitResultReply|null) => void
  ): UnaryResponse;
  submitResult(
    requestMessage: api_service_pb.SubmitResultRequest,
    callback: (error: ServiceError|null, responseMessage: api_service_pb.SubmitResultReply|null) => void
  ): UnaryResponse;
}

