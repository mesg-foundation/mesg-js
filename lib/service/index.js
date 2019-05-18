"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YAML = require("js-yaml");
var fs = require("fs");
var service_1 = require("./service");
exports.Service = service_1.default;
var grpc_1 = require("../util/grpc");
var token = process.env.MESG_TOKEN;
var endpoint = process.env.MESG_ENDPOINT;
var ymlPath = './mesg.yml';
var serviceBuilder = function () {
    var definition = YAML.safeLoad(fs.readFileSync(ymlPath));
    return new service_1.default({
        token: token,
        definition: definition,
        client: grpc_1.createClient('Service', 'protobuf/serviceapi/api.proto', endpoint)
    });
};
exports.default = serviceBuilder;
//# sourceMappingURL=index.js.map