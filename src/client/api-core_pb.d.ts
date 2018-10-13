// package: api
// file: api-core.proto

import * as jspb from "google-protobuf";

export class ListenEventRequest extends jspb.Message {
  getServiceid(): string;
  setServiceid(value: string): void;

  getEventfilter(): string;
  setEventfilter(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListenEventRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListenEventRequest): ListenEventRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListenEventRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListenEventRequest;
  static deserializeBinaryFromReader(message: ListenEventRequest, reader: jspb.BinaryReader): ListenEventRequest;
}

export namespace ListenEventRequest {
  export type AsObject = {
    serviceid: string,
    eventfilter: string,
  }
}

export class EventData extends jspb.Message {
  getEventkey(): string;
  setEventkey(value: string): void;

  getEventdata(): string;
  setEventdata(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventData.AsObject;
  static toObject(includeInstance: boolean, msg: EventData): EventData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventData;
  static deserializeBinaryFromReader(message: EventData, reader: jspb.BinaryReader): EventData;
}

export namespace EventData {
  export type AsObject = {
    eventkey: string,
    eventdata: string,
  }
}

export class ListenResultRequest extends jspb.Message {
  getServiceid(): string;
  setServiceid(value: string): void;

  getTaskfilter(): string;
  setTaskfilter(value: string): void;

  getOutputfilter(): string;
  setOutputfilter(value: string): void;

  clearTagfiltersList(): void;
  getTagfiltersList(): Array<string>;
  setTagfiltersList(value: Array<string>): void;
  addTagfilters(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListenResultRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListenResultRequest): ListenResultRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListenResultRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListenResultRequest;
  static deserializeBinaryFromReader(message: ListenResultRequest, reader: jspb.BinaryReader): ListenResultRequest;
}

export namespace ListenResultRequest {
  export type AsObject = {
    serviceid: string,
    taskfilter: string,
    outputfilter: string,
    tagfiltersList: Array<string>,
  }
}

export class ResultData extends jspb.Message {
  getExecutionid(): string;
  setExecutionid(value: string): void;

  getTaskkey(): string;
  setTaskkey(value: string): void;

  getOutputkey(): string;
  setOutputkey(value: string): void;

  getOutputdata(): string;
  setOutputdata(value: string): void;

  clearExecutiontagsList(): void;
  getExecutiontagsList(): Array<string>;
  setExecutiontagsList(value: Array<string>): void;
  addExecutiontags(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResultData.AsObject;
  static toObject(includeInstance: boolean, msg: ResultData): ResultData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResultData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResultData;
  static deserializeBinaryFromReader(message: ResultData, reader: jspb.BinaryReader): ResultData;
}

export namespace ResultData {
  export type AsObject = {
    executionid: string,
    taskkey: string,
    outputkey: string,
    outputdata: string,
    executiontagsList: Array<string>,
  }
}

export class ExecuteTaskRequest extends jspb.Message {
  getServiceid(): string;
  setServiceid(value: string): void;

  getTaskkey(): string;
  setTaskkey(value: string): void;

  getInputdata(): string;
  setInputdata(value: string): void;

  clearExecutiontagsList(): void;
  getExecutiontagsList(): Array<string>;
  setExecutiontagsList(value: Array<string>): void;
  addExecutiontags(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteTaskRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteTaskRequest): ExecuteTaskRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecuteTaskRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteTaskRequest;
  static deserializeBinaryFromReader(message: ExecuteTaskRequest, reader: jspb.BinaryReader): ExecuteTaskRequest;
}

export namespace ExecuteTaskRequest {
  export type AsObject = {
    serviceid: string,
    taskkey: string,
    inputdata: string,
    executiontagsList: Array<string>,
  }
}

export class ExecuteTaskReply extends jspb.Message {
  getExecutionid(): string;
  setExecutionid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteTaskReply.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteTaskReply): ExecuteTaskReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecuteTaskReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteTaskReply;
  static deserializeBinaryFromReader(message: ExecuteTaskReply, reader: jspb.BinaryReader): ExecuteTaskReply;
}

export namespace ExecuteTaskReply {
  export type AsObject = {
    executionid: string,
  }
}

export class StartServiceRequest extends jspb.Message {
  getServiceid(): string;
  setServiceid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartServiceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StartServiceRequest): StartServiceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartServiceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartServiceRequest;
  static deserializeBinaryFromReader(message: StartServiceRequest, reader: jspb.BinaryReader): StartServiceRequest;
}

export namespace StartServiceRequest {
  export type AsObject = {
    serviceid: string,
  }
}

export class StartServiceReply extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartServiceReply.AsObject;
  static toObject(includeInstance: boolean, msg: StartServiceReply): StartServiceReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartServiceReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartServiceReply;
  static deserializeBinaryFromReader(message: StartServiceReply, reader: jspb.BinaryReader): StartServiceReply;
}

export namespace StartServiceReply {
  export type AsObject = {
  }
}

export class StopServiceRequest extends jspb.Message {
  getServiceid(): string;
  setServiceid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopServiceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StopServiceRequest): StopServiceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StopServiceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopServiceRequest;
  static deserializeBinaryFromReader(message: StopServiceRequest, reader: jspb.BinaryReader): StopServiceRequest;
}

export namespace StopServiceRequest {
  export type AsObject = {
    serviceid: string,
  }
}

export class StopServiceReply extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StopServiceReply.AsObject;
  static toObject(includeInstance: boolean, msg: StopServiceReply): StopServiceReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StopServiceReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StopServiceReply;
  static deserializeBinaryFromReader(message: StopServiceReply, reader: jspb.BinaryReader): StopServiceReply;
}

export namespace StopServiceReply {
  export type AsObject = {
  }
}

export class DeployServiceRequest extends jspb.Message {
  hasUrl(): boolean;
  clearUrl(): void;
  getUrl(): string;
  setUrl(value: string): void;

  hasChunk(): boolean;
  clearChunk(): void;
  getChunk(): Uint8Array | string;
  getChunk_asU8(): Uint8Array;
  getChunk_asB64(): string;
  setChunk(value: Uint8Array | string): void;

  getValueCase(): DeployServiceRequest.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeployServiceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeployServiceRequest): DeployServiceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeployServiceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeployServiceRequest;
  static deserializeBinaryFromReader(message: DeployServiceRequest, reader: jspb.BinaryReader): DeployServiceRequest;
}

export namespace DeployServiceRequest {
  export type AsObject = {
    url: string,
    chunk: Uint8Array | string,
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    URL = 2,
    CHUNK = 3,
  }
}

export class DeployServiceReply extends jspb.Message {
  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): DeployServiceReply.Status | undefined;
  setStatus(value?: DeployServiceReply.Status): void;

  hasServiceid(): boolean;
  clearServiceid(): void;
  getServiceid(): string;
  setServiceid(value: string): void;

  hasValidationerror(): boolean;
  clearValidationerror(): void;
  getValidationerror(): string;
  setValidationerror(value: string): void;

  getValueCase(): DeployServiceReply.ValueCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeployServiceReply.AsObject;
  static toObject(includeInstance: boolean, msg: DeployServiceReply): DeployServiceReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeployServiceReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeployServiceReply;
  static deserializeBinaryFromReader(message: DeployServiceReply, reader: jspb.BinaryReader): DeployServiceReply;
}

export namespace DeployServiceReply {
  export type AsObject = {
    status?: DeployServiceReply.Status.AsObject,
    serviceid: string,
    validationerror: string,
  }

  export class Status extends jspb.Message {
    getMessage(): string;
    setMessage(value: string): void;

    getType(): DeployServiceReply.Status.Type;
    setType(value: DeployServiceReply.Status.Type): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Status.AsObject;
    static toObject(includeInstance: boolean, msg: Status): Status.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Status, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Status;
    static deserializeBinaryFromReader(message: Status, reader: jspb.BinaryReader): Status;
  }

  export namespace Status {
    export type AsObject = {
      message: string,
      type: DeployServiceReply.Status.Type,
    }

    export enum Type {
      RUNNING = 0,
      DONE_POSITIVE = 1,
      DONE_NEGATIVE = 2,
    }
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    STATUS = 2,
    SERVICEID = 3,
    VALIDATIONERROR = 4,
  }
}

export class DeleteServiceRequest extends jspb.Message {
  getServiceid(): string;
  setServiceid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteServiceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteServiceRequest): DeleteServiceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteServiceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteServiceRequest;
  static deserializeBinaryFromReader(message: DeleteServiceRequest, reader: jspb.BinaryReader): DeleteServiceRequest;
}

export namespace DeleteServiceRequest {
  export type AsObject = {
    serviceid: string,
  }
}

export class DeleteServiceReply extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteServiceReply.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteServiceReply): DeleteServiceReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteServiceReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteServiceReply;
  static deserializeBinaryFromReader(message: DeleteServiceReply, reader: jspb.BinaryReader): DeleteServiceReply;
}

export namespace DeleteServiceReply {
  export type AsObject = {
  }
}

export class ListServicesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListServicesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListServicesRequest): ListServicesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListServicesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListServicesRequest;
  static deserializeBinaryFromReader(message: ListServicesRequest, reader: jspb.BinaryReader): ListServicesRequest;
}

export namespace ListServicesRequest {
  export type AsObject = {
  }
}

export class ListServicesReply extends jspb.Message {
  clearServicesList(): void;
  getServicesList(): Array<Service>;
  setServicesList(value: Array<Service>): void;
  addServices(value?: Service, index?: number): Service;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListServicesReply.AsObject;
  static toObject(includeInstance: boolean, msg: ListServicesReply): ListServicesReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListServicesReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListServicesReply;
  static deserializeBinaryFromReader(message: ListServicesReply, reader: jspb.BinaryReader): ListServicesReply;
}

export namespace ListServicesReply {
  export type AsObject = {
    servicesList: Array<Service.AsObject>,
  }
}

export class GetServiceRequest extends jspb.Message {
  getServiceid(): string;
  setServiceid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetServiceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetServiceRequest): GetServiceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetServiceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetServiceRequest;
  static deserializeBinaryFromReader(message: GetServiceRequest, reader: jspb.BinaryReader): GetServiceRequest;
}

export namespace GetServiceRequest {
  export type AsObject = {
    serviceid: string,
  }
}

export class GetServiceReply extends jspb.Message {
  hasService(): boolean;
  clearService(): void;
  getService(): Service | undefined;
  setService(value?: Service): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetServiceReply.AsObject;
  static toObject(includeInstance: boolean, msg: GetServiceReply): GetServiceReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetServiceReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetServiceReply;
  static deserializeBinaryFromReader(message: GetServiceReply, reader: jspb.BinaryReader): GetServiceReply;
}

export namespace GetServiceReply {
  export type AsObject = {
    service?: Service.AsObject,
  }
}

export class ServiceLogsRequest extends jspb.Message {
  getServiceid(): string;
  setServiceid(value: string): void;

  clearDependenciesList(): void;
  getDependenciesList(): Array<string>;
  setDependenciesList(value: Array<string>): void;
  addDependencies(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServiceLogsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ServiceLogsRequest): ServiceLogsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ServiceLogsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServiceLogsRequest;
  static deserializeBinaryFromReader(message: ServiceLogsRequest, reader: jspb.BinaryReader): ServiceLogsRequest;
}

export namespace ServiceLogsRequest {
  export type AsObject = {
    serviceid: string,
    dependenciesList: Array<string>,
  }
}

export class LogData extends jspb.Message {
  getDependency(): string;
  setDependency(value: string): void;

  getType(): LogData.Type;
  setType(value: LogData.Type): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LogData.AsObject;
  static toObject(includeInstance: boolean, msg: LogData): LogData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LogData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LogData;
  static deserializeBinaryFromReader(message: LogData, reader: jspb.BinaryReader): LogData;
}

export namespace LogData {
  export type AsObject = {
    dependency: string,
    type: LogData.Type,
    data: Uint8Array | string,
  }

  export enum Type {
    STANDARD = 0,
    ERROR = 1,
  }
}

export class Service extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  clearTasksList(): void;
  getTasksList(): Array<Task>;
  setTasksList(value: Array<Task>): void;
  addTasks(value?: Task, index?: number): Task;

  clearEventsList(): void;
  getEventsList(): Array<Event>;
  setEventsList(value: Array<Event>): void;
  addEvents(value?: Event, index?: number): Event;

  clearDependenciesList(): void;
  getDependenciesList(): Array<Dependency>;
  setDependenciesList(value: Array<Dependency>): void;
  addDependencies(value?: Dependency, index?: number): Dependency;

  hasConfiguration(): boolean;
  clearConfiguration(): void;
  getConfiguration(): Dependency | undefined;
  setConfiguration(value?: Dependency): void;

  getRepository(): string;
  setRepository(value: string): void;

  getStatus(): Service.Status;
  setStatus(value: Service.Status): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Service.AsObject;
  static toObject(includeInstance: boolean, msg: Service): Service.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Service, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Service;
  static deserializeBinaryFromReader(message: Service, reader: jspb.BinaryReader): Service;
}

export namespace Service {
  export type AsObject = {
    id: string,
    name: string,
    description: string,
    tasksList: Array<Task.AsObject>,
    eventsList: Array<Event.AsObject>,
    dependenciesList: Array<Dependency.AsObject>,
    configuration?: Dependency.AsObject,
    repository: string,
    status: Service.Status,
  }

  export enum Status {
    UNKNOWN = 0,
    STOPPED = 1,
    STARTING = 2,
    PARTIAL = 3,
    RUNNING = 4,
  }
}

export class Event extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  clearDataList(): void;
  getDataList(): Array<Parameter>;
  setDataList(value: Array<Parameter>): void;
  addData(value?: Parameter, index?: number): Parameter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Event.AsObject;
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Event;
  static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
  export type AsObject = {
    key: string,
    name: string,
    description: string,
    dataList: Array<Parameter.AsObject>,
  }
}

export class Task extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  clearInputsList(): void;
  getInputsList(): Array<Parameter>;
  setInputsList(value: Array<Parameter>): void;
  addInputs(value?: Parameter, index?: number): Parameter;

  clearOutputsList(): void;
  getOutputsList(): Array<Output>;
  setOutputsList(value: Array<Output>): void;
  addOutputs(value?: Output, index?: number): Output;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Task.AsObject;
  static toObject(includeInstance: boolean, msg: Task): Task.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Task, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Task;
  static deserializeBinaryFromReader(message: Task, reader: jspb.BinaryReader): Task;
}

export namespace Task {
  export type AsObject = {
    key: string,
    name: string,
    description: string,
    inputsList: Array<Parameter.AsObject>,
    outputsList: Array<Output.AsObject>,
  }
}

export class Output extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  clearDataList(): void;
  getDataList(): Array<Parameter>;
  setDataList(value: Array<Parameter>): void;
  addData(value?: Parameter, index?: number): Parameter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Output.AsObject;
  static toObject(includeInstance: boolean, msg: Output): Output.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Output, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Output;
  static deserializeBinaryFromReader(message: Output, reader: jspb.BinaryReader): Output;
}

export namespace Output {
  export type AsObject = {
    key: string,
    name: string,
    description: string,
    dataList: Array<Parameter.AsObject>,
  }
}

export class Parameter extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getType(): string;
  setType(value: string): void;

  getOptional(): boolean;
  setOptional(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Parameter.AsObject;
  static toObject(includeInstance: boolean, msg: Parameter): Parameter.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Parameter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Parameter;
  static deserializeBinaryFromReader(message: Parameter, reader: jspb.BinaryReader): Parameter;
}

export namespace Parameter {
  export type AsObject = {
    key: string,
    name: string,
    description: string,
    type: string,
    optional: boolean,
  }
}

export class Dependency extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getImage(): string;
  setImage(value: string): void;

  clearVolumesList(): void;
  getVolumesList(): Array<string>;
  setVolumesList(value: Array<string>): void;
  addVolumes(value: string, index?: number): string;

  clearVolumesfromList(): void;
  getVolumesfromList(): Array<string>;
  setVolumesfromList(value: Array<string>): void;
  addVolumesfrom(value: string, index?: number): string;

  clearPortsList(): void;
  getPortsList(): Array<string>;
  setPortsList(value: Array<string>): void;
  addPorts(value: string, index?: number): string;

  getCommand(): string;
  setCommand(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Dependency.AsObject;
  static toObject(includeInstance: boolean, msg: Dependency): Dependency.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Dependency, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Dependency;
  static deserializeBinaryFromReader(message: Dependency, reader: jspb.BinaryReader): Dependency;
}

export namespace Dependency {
  export type AsObject = {
    key: string,
    image: string,
    volumesList: Array<string>,
    volumesfromList: Array<string>,
    portsList: Array<string>,
    command: string,
  }
}

