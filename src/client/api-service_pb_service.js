// package: api
// file: api-service.proto

var api_service_pb = require("./api-service_pb");
var grpc = require("grpc-web-client").grpc;

var Service = (function () {
  function Service() {}
  Service.serviceName = "api.Service";
  return Service;
}());

Service.EmitEvent = {
  methodName: "EmitEvent",
  service: Service,
  requestStream: false,
  responseStream: false,
  requestType: api_service_pb.EmitEventRequest,
  responseType: api_service_pb.EmitEventReply
};

Service.ListenTask = {
  methodName: "ListenTask",
  service: Service,
  requestStream: false,
  responseStream: true,
  requestType: api_service_pb.ListenTaskRequest,
  responseType: api_service_pb.TaskData
};

Service.SubmitResult = {
  methodName: "SubmitResult",
  service: Service,
  requestStream: false,
  responseStream: false,
  requestType: api_service_pb.SubmitResultRequest,
  responseType: api_service_pb.SubmitResultReply
};

exports.Service = Service;

function ServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ServiceClient.prototype.emitEvent = function emitEvent(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Service.EmitEvent, {
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

ServiceClient.prototype.listenTask = function listenTask(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Service.ListenTask, {
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

ServiceClient.prototype.submitResult = function submitResult(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(Service.SubmitResult, {
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

exports.ServiceClient = ServiceClient;

