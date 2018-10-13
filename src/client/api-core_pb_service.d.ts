// package: api
// file: api-core.proto

import * as api_core_pb from "./api-core_pb";
import {grpc} from "grpc-web-client";

type CoreListenEvent = {
  readonly methodName: string;
  readonly service: typeof Core;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_core_pb.ListenEventRequest;
  readonly responseType: typeof api_core_pb.EventData;
};

type CoreListenResult = {
  readonly methodName: string;
  readonly service: typeof Core;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_core_pb.ListenResultRequest;
  readonly responseType: typeof api_core_pb.ResultData;
};

type CoreExecuteTask = {
  readonly methodName: string;
  readonly service: typeof Core;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_core_pb.ExecuteTaskRequest;
  readonly responseType: typeof api_core_pb.ExecuteTaskReply;
};

type CoreStartService = {
  readonly methodName: string;
  readonly service: typeof Core;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_core_pb.StartServiceRequest;
  readonly responseType: typeof api_core_pb.StartServiceReply;
};

type CoreStopService = {
  readonly methodName: string;
  readonly service: typeof Core;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_core_pb.StopServiceRequest;
  readonly responseType: typeof api_core_pb.StopServiceReply;
};

type CoreDeployService = {
  readonly methodName: string;
  readonly service: typeof Core;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof api_core_pb.DeployServiceRequest;
  readonly responseType: typeof api_core_pb.DeployServiceReply;
};

type CoreDeleteService = {
  readonly methodName: string;
  readonly service: typeof Core;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_core_pb.DeleteServiceRequest;
  readonly responseType: typeof api_core_pb.DeleteServiceReply;
};

type CoreListServices = {
  readonly methodName: string;
  readonly service: typeof Core;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_core_pb.ListServicesRequest;
  readonly responseType: typeof api_core_pb.ListServicesReply;
};

type CoreGetService = {
  readonly methodName: string;
  readonly service: typeof Core;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof api_core_pb.GetServiceRequest;
  readonly responseType: typeof api_core_pb.GetServiceReply;
};

type CoreServiceLogs = {
  readonly methodName: string;
  readonly service: typeof Core;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof api_core_pb.ServiceLogsRequest;
  readonly responseType: typeof api_core_pb.LogData;
};

export class Core {
  static readonly serviceName: string;
  static readonly ListenEvent: CoreListenEvent;
  static readonly ListenResult: CoreListenResult;
  static readonly ExecuteTask: CoreExecuteTask;
  static readonly StartService: CoreStartService;
  static readonly StopService: CoreStopService;
  static readonly DeployService: CoreDeployService;
  static readonly DeleteService: CoreDeleteService;
  static readonly ListServices: CoreListServices;
  static readonly GetService: CoreGetService;
  static readonly ServiceLogs: CoreServiceLogs;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }
export type ServiceClientOptions = { transport: grpc.TransportConstructor; debug?: boolean }

interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}

export class CoreClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: ServiceClientOptions);
  listenEvent(requestMessage: api_core_pb.ListenEventRequest, metadata?: grpc.Metadata): ResponseStream<api_core_pb.EventData>;
  listenResult(requestMessage: api_core_pb.ListenResultRequest, metadata?: grpc.Metadata): ResponseStream<api_core_pb.ResultData>;
  executeTask(
    requestMessage: api_core_pb.ExecuteTaskRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_core_pb.ExecuteTaskReply|null) => void
  ): void;
  executeTask(
    requestMessage: api_core_pb.ExecuteTaskRequest,
    callback: (error: ServiceError, responseMessage: api_core_pb.ExecuteTaskReply|null) => void
  ): void;
  startService(
    requestMessage: api_core_pb.StartServiceRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_core_pb.StartServiceReply|null) => void
  ): void;
  startService(
    requestMessage: api_core_pb.StartServiceRequest,
    callback: (error: ServiceError, responseMessage: api_core_pb.StartServiceReply|null) => void
  ): void;
  stopService(
    requestMessage: api_core_pb.StopServiceRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_core_pb.StopServiceReply|null) => void
  ): void;
  stopService(
    requestMessage: api_core_pb.StopServiceRequest,
    callback: (error: ServiceError, responseMessage: api_core_pb.StopServiceReply|null) => void
  ): void;
  deployService(): void;
  deleteService(
    requestMessage: api_core_pb.DeleteServiceRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_core_pb.DeleteServiceReply|null) => void
  ): void;
  deleteService(
    requestMessage: api_core_pb.DeleteServiceRequest,
    callback: (error: ServiceError, responseMessage: api_core_pb.DeleteServiceReply|null) => void
  ): void;
  listServices(
    requestMessage: api_core_pb.ListServicesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_core_pb.ListServicesReply|null) => void
  ): void;
  listServices(
    requestMessage: api_core_pb.ListServicesRequest,
    callback: (error: ServiceError, responseMessage: api_core_pb.ListServicesReply|null) => void
  ): void;
  getService(
    requestMessage: api_core_pb.GetServiceRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: api_core_pb.GetServiceReply|null) => void
  ): void;
  getService(
    requestMessage: api_core_pb.GetServiceRequest,
    callback: (error: ServiceError, responseMessage: api_core_pb.GetServiceReply|null) => void
  ): void;
  serviceLogs(requestMessage: api_core_pb.ServiceLogsRequest, metadata?: grpc.Metadata): ResponseStream<api_core_pb.LogData>;
}

