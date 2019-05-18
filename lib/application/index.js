"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("./application");
exports.Application = application_1.default;
var grpc_1 = require("../util/grpc");
var defaultEndpoint = 'localhost:50052';
var applicationBuilder = function (options) {
    var endpoint = options && options.endpoint ? options.endpoint : defaultEndpoint;
    return new application_1.default({
        client: grpc_1.createClient('Core', 'protobuf/coreapi/api.proto', endpoint)
    });
};
exports.default = applicationBuilder;
//# sourceMappingURL=index.js.map