// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var api$core_pb = require('./api-core_pb.js');

function serialize_api_CreateWorkflowReply(arg) {
  if (!(arg instanceof api$core_pb.CreateWorkflowReply)) {
    throw new Error('Expected argument of type api.CreateWorkflowReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_CreateWorkflowReply(buffer_arg) {
  return api$core_pb.CreateWorkflowReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_CreateWorkflowRequest(arg) {
  if (!(arg instanceof api$core_pb.CreateWorkflowRequest)) {
    throw new Error('Expected argument of type api.CreateWorkflowRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_CreateWorkflowRequest(buffer_arg) {
  return api$core_pb.CreateWorkflowRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_DeleteServiceReply(arg) {
  if (!(arg instanceof api$core_pb.DeleteServiceReply)) {
    throw new Error('Expected argument of type api.DeleteServiceReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_DeleteServiceReply(buffer_arg) {
  return api$core_pb.DeleteServiceReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_DeleteServiceRequest(arg) {
  if (!(arg instanceof api$core_pb.DeleteServiceRequest)) {
    throw new Error('Expected argument of type api.DeleteServiceRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_DeleteServiceRequest(buffer_arg) {
  return api$core_pb.DeleteServiceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_DeleteWorkflowReply(arg) {
  if (!(arg instanceof api$core_pb.DeleteWorkflowReply)) {
    throw new Error('Expected argument of type api.DeleteWorkflowReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_DeleteWorkflowReply(buffer_arg) {
  return api$core_pb.DeleteWorkflowReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_DeleteWorkflowRequest(arg) {
  if (!(arg instanceof api$core_pb.DeleteWorkflowRequest)) {
    throw new Error('Expected argument of type api.DeleteWorkflowRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_DeleteWorkflowRequest(buffer_arg) {
  return api$core_pb.DeleteWorkflowRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_DeployServiceReply(arg) {
  if (!(arg instanceof api$core_pb.DeployServiceReply)) {
    throw new Error('Expected argument of type api.DeployServiceReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_DeployServiceReply(buffer_arg) {
  return api$core_pb.DeployServiceReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_DeployServiceRequest(arg) {
  if (!(arg instanceof api$core_pb.DeployServiceRequest)) {
    throw new Error('Expected argument of type api.DeployServiceRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_DeployServiceRequest(buffer_arg) {
  return api$core_pb.DeployServiceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_EventData(arg) {
  if (!(arg instanceof api$core_pb.EventData)) {
    throw new Error('Expected argument of type api.EventData');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_EventData(buffer_arg) {
  return api$core_pb.EventData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_ExecuteTaskReply(arg) {
  if (!(arg instanceof api$core_pb.ExecuteTaskReply)) {
    throw new Error('Expected argument of type api.ExecuteTaskReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_ExecuteTaskReply(buffer_arg) {
  return api$core_pb.ExecuteTaskReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_ExecuteTaskRequest(arg) {
  if (!(arg instanceof api$core_pb.ExecuteTaskRequest)) {
    throw new Error('Expected argument of type api.ExecuteTaskRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_ExecuteTaskRequest(buffer_arg) {
  return api$core_pb.ExecuteTaskRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_GetServiceReply(arg) {
  if (!(arg instanceof api$core_pb.GetServiceReply)) {
    throw new Error('Expected argument of type api.GetServiceReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_GetServiceReply(buffer_arg) {
  return api$core_pb.GetServiceReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_GetServiceRequest(arg) {
  if (!(arg instanceof api$core_pb.GetServiceRequest)) {
    throw new Error('Expected argument of type api.GetServiceRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_GetServiceRequest(buffer_arg) {
  return api$core_pb.GetServiceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_ListServicesReply(arg) {
  if (!(arg instanceof api$core_pb.ListServicesReply)) {
    throw new Error('Expected argument of type api.ListServicesReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_ListServicesReply(buffer_arg) {
  return api$core_pb.ListServicesReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_ListServicesRequest(arg) {
  if (!(arg instanceof api$core_pb.ListServicesRequest)) {
    throw new Error('Expected argument of type api.ListServicesRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_ListServicesRequest(buffer_arg) {
  return api$core_pb.ListServicesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_ListenEventRequest(arg) {
  if (!(arg instanceof api$core_pb.ListenEventRequest)) {
    throw new Error('Expected argument of type api.ListenEventRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_ListenEventRequest(buffer_arg) {
  return api$core_pb.ListenEventRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_ListenResultRequest(arg) {
  if (!(arg instanceof api$core_pb.ListenResultRequest)) {
    throw new Error('Expected argument of type api.ListenResultRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_ListenResultRequest(buffer_arg) {
  return api$core_pb.ListenResultRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_LogData(arg) {
  if (!(arg instanceof api$core_pb.LogData)) {
    throw new Error('Expected argument of type api.LogData');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_LogData(buffer_arg) {
  return api$core_pb.LogData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_ResultData(arg) {
  if (!(arg instanceof api$core_pb.ResultData)) {
    throw new Error('Expected argument of type api.ResultData');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_ResultData(buffer_arg) {
  return api$core_pb.ResultData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_ServiceLogsRequest(arg) {
  if (!(arg instanceof api$core_pb.ServiceLogsRequest)) {
    throw new Error('Expected argument of type api.ServiceLogsRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_ServiceLogsRequest(buffer_arg) {
  return api$core_pb.ServiceLogsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_StartServiceReply(arg) {
  if (!(arg instanceof api$core_pb.StartServiceReply)) {
    throw new Error('Expected argument of type api.StartServiceReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_StartServiceReply(buffer_arg) {
  return api$core_pb.StartServiceReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_StartServiceRequest(arg) {
  if (!(arg instanceof api$core_pb.StartServiceRequest)) {
    throw new Error('Expected argument of type api.StartServiceRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_StartServiceRequest(buffer_arg) {
  return api$core_pb.StartServiceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_StopServiceReply(arg) {
  if (!(arg instanceof api$core_pb.StopServiceReply)) {
    throw new Error('Expected argument of type api.StopServiceReply');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_StopServiceReply(buffer_arg) {
  return api$core_pb.StopServiceReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_StopServiceRequest(arg) {
  if (!(arg instanceof api$core_pb.StopServiceRequest)) {
    throw new Error('Expected argument of type api.StopServiceRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_api_StopServiceRequest(buffer_arg) {
  return api$core_pb.StopServiceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// This is the primary API to interact with MESG Core functionalities.
// It can be consumed by any applications or tools that you'd like to interact with MESG Core.
// It is actually used by the MESG CLI and MESG Application libraries.
//
// This API is only accessible through [gRPC](https://grpc.io/).
//
// Services must not use this API, but rather use the [Service API](./service.md).
//
// The source file of this API is hosted on [GitHub](https://github.com/mesg-foundation/core/blob/master/api/core/api.proto).
var CoreService = exports.CoreService = {
  // Subscribe to a stream that listens for events from a service.
  listenEvent: {
    path: '/api.Core/ListenEvent',
    requestStream: false,
    responseStream: true,
    requestType: api$core_pb.ListenEventRequest,
    responseType: api$core_pb.EventData,
    requestSerialize: serialize_api_ListenEventRequest,
    requestDeserialize: deserialize_api_ListenEventRequest,
    responseSerialize: serialize_api_EventData,
    responseDeserialize: deserialize_api_EventData,
  },
  // Subscribe to a stream that listens for task's result from a service.
  listenResult: {
    path: '/api.Core/ListenResult',
    requestStream: false,
    responseStream: true,
    requestType: api$core_pb.ListenResultRequest,
    responseType: api$core_pb.ResultData,
    requestSerialize: serialize_api_ListenResultRequest,
    requestDeserialize: deserialize_api_ListenResultRequest,
    responseSerialize: serialize_api_ResultData,
    responseDeserialize: deserialize_api_ResultData,
  },
  // Execute a service's task through Core.
  executeTask: {
    path: '/api.Core/ExecuteTask',
    requestStream: false,
    responseStream: false,
    requestType: api$core_pb.ExecuteTaskRequest,
    responseType: api$core_pb.ExecuteTaskReply,
    requestSerialize: serialize_api_ExecuteTaskRequest,
    requestDeserialize: deserialize_api_ExecuteTaskRequest,
    responseSerialize: serialize_api_ExecuteTaskReply,
    responseDeserialize: deserialize_api_ExecuteTaskReply,
  },
  // Start a service. The service must be already deployed to Core.
  startService: {
    path: '/api.Core/StartService',
    requestStream: false,
    responseStream: false,
    requestType: api$core_pb.StartServiceRequest,
    responseType: api$core_pb.StartServiceReply,
    requestSerialize: serialize_api_StartServiceRequest,
    requestDeserialize: deserialize_api_StartServiceRequest,
    responseSerialize: serialize_api_StartServiceReply,
    responseDeserialize: deserialize_api_StartServiceReply,
  },
  // Stop a service. The service must be already deployed to Core.
  stopService: {
    path: '/api.Core/StopService',
    requestStream: false,
    responseStream: false,
    requestType: api$core_pb.StopServiceRequest,
    responseType: api$core_pb.StopServiceReply,
    requestSerialize: serialize_api_StopServiceRequest,
    requestDeserialize: deserialize_api_StopServiceRequest,
    responseSerialize: serialize_api_StopServiceReply,
    responseDeserialize: deserialize_api_StopServiceReply,
  },
  // Deploy a service to Core. This will give you an unique identifier which is used to interact with the service.
  deployService: {
    path: '/api.Core/DeployService',
    requestStream: true,
    responseStream: true,
    requestType: api$core_pb.DeployServiceRequest,
    responseType: api$core_pb.DeployServiceReply,
    requestSerialize: serialize_api_DeployServiceRequest,
    requestDeserialize: deserialize_api_DeployServiceRequest,
    responseSerialize: serialize_api_DeployServiceReply,
    responseDeserialize: deserialize_api_DeployServiceReply,
  },
  // Delete a service from Core. This function only deletes a deployed service in Core. If the service's code is on your computer, the source code will not be deleted.
  deleteService: {
    path: '/api.Core/DeleteService',
    requestStream: false,
    responseStream: false,
    requestType: api$core_pb.DeleteServiceRequest,
    responseType: api$core_pb.DeleteServiceReply,
    requestSerialize: serialize_api_DeleteServiceRequest,
    requestDeserialize: deserialize_api_DeleteServiceRequest,
    responseSerialize: serialize_api_DeleteServiceReply,
    responseDeserialize: deserialize_api_DeleteServiceReply,
  },
  // List all services already deployed in Core.
  listServices: {
    path: '/api.Core/ListServices',
    requestStream: false,
    responseStream: false,
    requestType: api$core_pb.ListServicesRequest,
    responseType: api$core_pb.ListServicesReply,
    requestSerialize: serialize_api_ListServicesRequest,
    requestDeserialize: deserialize_api_ListServicesRequest,
    responseSerialize: serialize_api_ListServicesReply,
    responseDeserialize: deserialize_api_ListServicesReply,
  },
  // Get the definition of an already-deployed service from its ID.
  getService: {
    path: '/api.Core/GetService',
    requestStream: false,
    responseStream: false,
    requestType: api$core_pb.GetServiceRequest,
    responseType: api$core_pb.GetServiceReply,
    requestSerialize: serialize_api_GetServiceRequest,
    requestDeserialize: deserialize_api_GetServiceRequest,
    responseSerialize: serialize_api_GetServiceReply,
    responseDeserialize: deserialize_api_GetServiceReply,
  },
  // ServiceLogs gives a stream for dependency logs of a service.
  serviceLogs: {
    path: '/api.Core/ServiceLogs',
    requestStream: false,
    responseStream: true,
    requestType: api$core_pb.ServiceLogsRequest,
    responseType: api$core_pb.LogData,
    requestSerialize: serialize_api_ServiceLogsRequest,
    requestDeserialize: deserialize_api_ServiceLogsRequest,
    responseSerialize: serialize_api_LogData,
    responseDeserialize: deserialize_api_LogData,
  },
  // CreateWorkflow creates and runs a new workflow.
  createWorkflow: {
    path: '/api.Core/CreateWorkflow',
    requestStream: false,
    responseStream: false,
    requestType: api$core_pb.CreateWorkflowRequest,
    responseType: api$core_pb.CreateWorkflowReply,
    requestSerialize: serialize_api_CreateWorkflowRequest,
    requestDeserialize: deserialize_api_CreateWorkflowRequest,
    responseSerialize: serialize_api_CreateWorkflowReply,
    responseDeserialize: deserialize_api_CreateWorkflowReply,
  },
  // DeleteWorkflow stops and deletes a workflow.
  deleteWorkflow: {
    path: '/api.Core/DeleteWorkflow',
    requestStream: false,
    responseStream: false,
    requestType: api$core_pb.DeleteWorkflowRequest,
    responseType: api$core_pb.DeleteWorkflowReply,
    requestSerialize: serialize_api_DeleteWorkflowRequest,
    requestDeserialize: deserialize_api_DeleteWorkflowRequest,
    responseSerialize: serialize_api_DeleteWorkflowReply,
    responseDeserialize: deserialize_api_DeleteWorkflowReply,
  },
};

exports.CoreClient = grpc.makeGenericClientConstructor(CoreService);
