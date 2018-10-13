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
  grpc.unary(Core.ExecuteTask, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

CoreClient.prototype.startService = function startService(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Core.StartService, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

CoreClient.prototype.stopService = function stopService(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Core.StopService, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

Core.prototype.deployService = function deployService() {
  throw new Error("Client streaming is not currently supported");
}

CoreClient.prototype.deleteService = function deleteService(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Core.DeleteService, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

CoreClient.prototype.listServices = function listServices(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Core.ListServices, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

CoreClient.prototype.getService = function getService(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Core.GetService, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
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

exports.CoreClient = CoreClient;

