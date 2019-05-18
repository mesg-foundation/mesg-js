"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
var path = require("path");
function createClient(serviceName, filePath, endpoint) {
    var packageDefinition = protoLoader.loadSync(filePath, {
        includeDirs: [
            path.join(__dirname, '../')
        ],
    });
    var packageObject = grpc.loadPackageDefinition(packageDefinition);
    var clientConstructor = packageObject.api[serviceName];
    return new clientConstructor(endpoint, grpc.credentials.createInsecure());
}
exports.createClient = createClient;
var statusKey = 'status';
var statusReady = 'ready';
var errNoStatus = new Error('stream header does not contain any status');
exports.errNoStatus = errNoStatus;
var checkStreamReady = function (metadata) {
    var statuses = metadata.get(statusKey);
    if (!statuses.length) {
        return errNoStatus;
    }
    var lastStatus = statuses[statuses.length - 1];
    if (lastStatus != statusReady) {
        return new Error("stream header status is different than ready. Got " + lastStatus);
    }
};
exports.checkStreamReady = checkStreamReady;
//# sourceMappingURL=grpc.js.map