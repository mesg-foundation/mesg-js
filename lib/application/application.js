"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require("uuid/v4");
var api_1 = require("../util/api");
var grpc_1 = require("../util/grpc");
var Application = (function () {
    function Application(options) {
        this.api = options.client;
    }
    Application.prototype.listenEvent = function (req) {
        return this.api.ListenEvent(req);
    };
    Application.prototype.listenResult = function (req) {
        return this.api.ListenResult(req);
    };
    Application.prototype.executeTask = function (req) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.api.ExecuteTask(req, api_1.handleAPIResponse(resolve, reject));
        });
    };
    Application.prototype.executeTaskAndWaitResult = function (req) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var id = uuidv4();
            var stream = _this.listenResult({ serviceID: req.serviceID, tagFilters: [id] })
                .on('metadata', function (metadata) {
                var err = grpc_1.checkStreamReady(metadata);
                if (err == grpc_1.errNoStatus)
                    return;
                if (err) {
                    stream.destroy(err);
                    return;
                }
                if (req.executionTags) {
                    req.executionTags.push(id);
                }
                else {
                    req.executionTags = [id];
                }
                _this.executeTask(req).catch(function (err) { return stream.destroy(err); });
            })
                .on('data', function (result) {
                stream.cancel();
                resolve(result);
            })
                .on('error', function (err) {
                stream.cancel();
                reject(err);
            });
        });
    };
    return Application;
}());
exports.default = Application;
//# sourceMappingURL=application.js.map