// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var api$service_pb = require('./api-service_pb.js');

function serialize_api_EmitEventReply(arg) {
  if (!(arg instanceof api$service_pb.EmitEventReply)) {
    throw new Error('Expected argument of type api.EmitEventReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_EmitEventReply(buffer_arg) {
  return api$service_pb.EmitEventReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_EmitEventRequest(arg) {
  if (!(arg instanceof api$service_pb.EmitEventRequest)) {
    throw new Error('Expected argument of type api.EmitEventRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_EmitEventRequest(buffer_arg) {
  return api$service_pb.EmitEventRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_ListenTaskRequest(arg) {
  if (!(arg instanceof api$service_pb.ListenTaskRequest)) {
    throw new Error('Expected argument of type api.ListenTaskRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_ListenTaskRequest(buffer_arg) {
  return api$service_pb.ListenTaskRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_SubmitResultReply(arg) {
  if (!(arg instanceof api$service_pb.SubmitResultReply)) {
    throw new Error('Expected argument of type api.SubmitResultReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_SubmitResultReply(buffer_arg) {
  return api$service_pb.SubmitResultReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_SubmitResultRequest(arg) {
  if (!(arg instanceof api$service_pb.SubmitResultRequest)) {
    throw new Error('Expected argument of type api.SubmitResultRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_SubmitResultRequest(buffer_arg) {
  return api$service_pb.SubmitResultRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_TaskData(arg) {
  if (!(arg instanceof api$service_pb.TaskData)) {
    throw new Error('Expected argument of type api.TaskData');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_TaskData(buffer_arg) {
  return api$service_pb.TaskData.deserializeBinary(new Uint8Array(buffer_arg));
}


// This is the API for MESG Services to interact with MESG Core.
// It is to be consumed only by MESG Services.
// It provides all necessary functions that MESG Services need in order to interact with MESG Core.
//
// This API is only accessible through [gRPC](https://grpc.io/).
//
// Applications must not use this API, but rather use the [Core API](./core.md).
//
// The source file of this API is hosted on [GitHub](https://github.com/mesg-foundation/core/blob/master/api/service/api.proto).
var ServiceService = exports.ServiceService = {
  // Emit an event to Core.
  // The event and its data must be defined in the [service's definition file](../guide/service/service-file.md).
  emitEvent: {
    path: '/api.Service/EmitEvent',
    requestStream: false,
    responseStream: false,
    requestType: api$service_pb.EmitEventRequest,
    responseType: api$service_pb.EmitEventReply,
    requestSerialize: serialize_api_EmitEventRequest,
    requestDeserialize: deserialize_api_EmitEventRequest,
    responseSerialize: serialize_api_EmitEventReply,
    responseDeserialize: deserialize_api_EmitEventReply,
  },
  // Subscribe to the stream of tasks to execute.
  // Every task received must be executed and its result must be submitted using the `SubmitResult` API.
  listenTask: {
    path: '/api.Service/ListenTask',
    requestStream: false,
    responseStream: true,
    requestType: api$service_pb.ListenTaskRequest,
    responseType: api$service_pb.TaskData,
    requestSerialize: serialize_api_ListenTaskRequest,
    requestDeserialize: deserialize_api_ListenTaskRequest,
    responseSerialize: serialize_api_TaskData,
    responseDeserialize: deserialize_api_TaskData,
  },
  // Submit the result of a task's execution to Core.
  // The result must be defined as a task's output in the [service's definition file](../guide/service/service-file.md).
  submitResult: {
    path: '/api.Service/SubmitResult',
    requestStream: false,
    responseStream: false,
    requestType: api$service_pb.SubmitResultRequest,
    responseType: api$service_pb.SubmitResultReply,
    requestSerialize: serialize_api_SubmitResultRequest,
    requestDeserialize: deserialize_api_SubmitResultRequest,
    responseSerialize: serialize_api_SubmitResultReply,
    responseDeserialize: deserialize_api_SubmitResultReply,
  },
};

exports.ServiceClient = grpc.makeGenericClientConstructor(ServiceService);
