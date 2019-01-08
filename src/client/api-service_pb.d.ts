// package: api
// file: api-service.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class EmitEventRequest extends jspb.Message { 
    getToken(): string;
    setToken(value: string): void;

    getEventkey(): string;
    setEventkey(value: string): void;

    getEventdata(): string;
    setEventdata(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmitEventRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EmitEventRequest): EmitEventRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmitEventRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmitEventRequest;
    static deserializeBinaryFromReader(message: EmitEventRequest, reader: jspb.BinaryReader): EmitEventRequest;
}

export namespace EmitEventRequest {
    export type AsObject = {
        token: string,
        eventkey: string,
        eventdata: string,
    }
}

export class EmitEventReply extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmitEventReply.AsObject;
    static toObject(includeInstance: boolean, msg: EmitEventReply): EmitEventReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmitEventReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmitEventReply;
    static deserializeBinaryFromReader(message: EmitEventReply, reader: jspb.BinaryReader): EmitEventReply;
}

export namespace EmitEventReply {
    export type AsObject = {
    }
}

export class ListenTaskRequest extends jspb.Message { 
    getToken(): string;
    setToken(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListenTaskRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListenTaskRequest): ListenTaskRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListenTaskRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListenTaskRequest;
    static deserializeBinaryFromReader(message: ListenTaskRequest, reader: jspb.BinaryReader): ListenTaskRequest;
}

export namespace ListenTaskRequest {
    export type AsObject = {
        token: string,
    }
}

export class TaskData extends jspb.Message { 
    getExecutionid(): string;
    setExecutionid(value: string): void;

    getTaskkey(): string;
    setTaskkey(value: string): void;

    getInputdata(): string;
    setInputdata(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskData.AsObject;
    static toObject(includeInstance: boolean, msg: TaskData): TaskData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskData;
    static deserializeBinaryFromReader(message: TaskData, reader: jspb.BinaryReader): TaskData;
}

export namespace TaskData {
    export type AsObject = {
        executionid: string,
        taskkey: string,
        inputdata: string,
    }
}

export class SubmitResultRequest extends jspb.Message { 
    getExecutionid(): string;
    setExecutionid(value: string): void;

    getOutputkey(): string;
    setOutputkey(value: string): void;

    getOutputdata(): string;
    setOutputdata(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubmitResultRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubmitResultRequest): SubmitResultRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubmitResultRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubmitResultRequest;
    static deserializeBinaryFromReader(message: SubmitResultRequest, reader: jspb.BinaryReader): SubmitResultRequest;
}

export namespace SubmitResultRequest {
    export type AsObject = {
        executionid: string,
        outputkey: string,
        outputdata: string,
    }
}

export class SubmitResultReply extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubmitResultReply.AsObject;
    static toObject(includeInstance: boolean, msg: SubmitResultReply): SubmitResultReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubmitResultReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubmitResultReply;
    static deserializeBinaryFromReader(message: SubmitResultReply, reader: jspb.BinaryReader): SubmitResultReply;
}

export namespace SubmitResultReply {
    export type AsObject = {
    }
}
