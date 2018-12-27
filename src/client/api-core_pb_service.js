// package: api
// file: api-core.proto

var api_core_pb = require("./api-core_pb");
var grpc = require("grpc-web-client").grpc;

var Core = (function () {
  function Core() {}
  Core.serviceName = "api.Core";
  return Core;
}());

Core.ListenEvent = {
  methodName: "ListenEvent",
  service: Core,
  requestStream: false,
  responseStream: true,
  requestType: api_core_pb.ListenEventRequest,
  responseType: api_core_pb.EventData
};

Core.ListenResult = {
  methodName: "ListenResult",
  service: Core,
  requestStream: false,
  responseStream: true,
  requestType: api_core_pb.ListenResultRequest,
  responseType: api_core_pb.ResultData
};

Core.ExecuteTask = {
  methodName: "ExecuteTask",
  service: Core,
  requestStream: false,
  responseStream: false,
  requestType: api_core_pb.ExecuteTaskRequest,
  responseType: api_core_pb.ExecuteTaskReply
};

Core.StartService = {
  methodName: "StartService",
  service: Core,
  requestStream: false,
  responseStream: false,
  requestType: api_core_pb.StartServiceRequest,
  responseType: api_core_pb.StartServiceReply
};

Core.StopService = {
  methodName: "StopService",
  service: Core,
  requestStream: false,
  responseStream: false,
  requestType: api_core_pb.StopServiceRequest,
  responseType: api_core_pb.StopServiceReply
};

Core.DeployService = {
  methodName: "DeployService",
  service: Core,
  requestStream: true,
  responseStream: true,
  requestType: api_core_pb.DeployServiceRequest,
  responseType: api_core_pb.DeployServiceReply
};

Core.DeleteService = {
  methodName: "DeleteService",
  service: Core,
  requestStream: false,
  responseStream: false,
  requestType: api_core_pb.DeleteServiceRequest,
  responseType: api_core_pb.DeleteServiceReply
};

Core.ListServices = {
  methodName: "ListServices",
  service: Core,
  requestStream: false,
  responseStream: false,
  requestType: api_core_pb.ListServicesRequest,
  responseType: api_core_pb.ListServicesReply
};

Core.GetService = {
  methodName: "GetService",
  service: Core,
  requestStream: false,
  responseStream: false,
  requestType: api_core_pb.GetServiceRequest,
  responseType: api_core_pb.GetServiceReply
};

Core.ServiceLogs = {
  methodName: "ServiceLogs",
  service: Core,
  requestStream: false,
  responseStream: true,
  requestType: api_core_pb.ServiceLogsRequest,
  responseType: api_core_pb.LogData
};

Core.CreateWorkflow = {
  methodName: "CreateWorkflow",
  service: Core,
  requestStream: false,
  responseStream: false,
  requestType: api_core_pb.CreateWorkflowRequest,
  responseType: api_core_pb.CreateWorkflowReply
};

Core.DeleteWorkflow = {
  methodName: "DeleteWorkflow",
  service: Core,
  requestStream: false,
  responseStream: false,
  requestType: api_core_pb.DeleteWorkflowRequest,
  responseType: api_core_pb.DeleteWorkflowReply
};

exports.Core = Core;

function CoreClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CoreClient.prototype.listenEvent = function listenEvent(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Core.ListenEvent, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

CoreClient.prototype.listenResult = function listenResult(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Core.ListenResult, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

CoreClient.prototype.executeTask = function executeTask(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Core.ExecuteTask, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CoreClient.prototype.startService = function startService(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Core.StartService, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CoreClient.prototype.stopService = function stopService(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Core.StopService, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CoreClient.prototype.deployService = function deployService(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(Core.DeployService, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.end.forEach(function (handler) {
      handler();
    });
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

CoreClient.prototype.deleteService = function deleteService(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Core.DeleteService, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CoreClient.prototype.listServices = function listServices(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Core.ListServices, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CoreClient.prototype.getService = function getService(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Core.GetService, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CoreClient.prototype.serviceLogs = function serviceLogs(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Core.ServiceLogs, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

CoreClient.prototype.createWorkflow = function createWorkflow(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Core.CreateWorkflow, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

CoreClient.prototype.deleteWorkflow = function deleteWorkflow(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Core.DeleteWorkflow, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.CoreClient = CoreClient;

