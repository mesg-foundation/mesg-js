"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../util/api");
var Service = (function () {
    function Service(options) {
        this.definition = options.definition;
        this.api = options.client;
        this.token = options.token;
    }
    Service.prototype.listenTask = function (_a) {
        var tasks = __rest(_a, []);
        if (this.tasks) {
            throw new Error("listenTask should be called only once");
        }
        this.tasks = tasks;
        this.validateTaskNames();
        var stream = this.api.listenTask({ token: this.token });
        stream.on('data', this.handleTaskData.bind(this));
        return stream;
    };
    Service.prototype.emitEvent = function (event, data) {
        var _this = this;
        if (!data)
            throw new Error('data object must be send while emitting event');
        return new Promise(function (resolve, reject) {
            _this.api.emitEvent({
                token: _this.token,
                eventKey: event,
                eventData: JSON.stringify(data)
            }, api_1.handleAPIResponse(resolve, reject));
        });
    };
    Service.prototype.handleTaskData = function (_a) {
        var _this = this;
        var executionID = _a.executionID, taskKey = _a.taskKey, inputData = _a.inputData;
        var callback = this.tasks[taskKey];
        if (!callback) {
            throw new Error("Task " + taskKey + " is not defined in your services");
        }
        var data = JSON.parse(inputData);
        var outputs = {};
        var taskConfig = this.definition.tasks[taskKey];
        var outputKeys = Object.keys(taskConfig.outputs || {}).concat(["success", "error"]).filter(function (x, i, a) { return a.indexOf(x) == i; });
        var _loop_1 = function (outputKey) {
            outputs[outputKey] = function (data) {
                if (!data)
                    throw new Error('data object must be send while submitting output');
                return new Promise(function (resolve, reject) {
                    _this.api.submitResult({
                        executionID: executionID,
                        outputKey: outputKey,
                        outputData: JSON.stringify(data)
                    }, api_1.handleAPIResponse(resolve, reject));
                });
            };
        };
        for (var _i = 0, outputKeys_1 = outputKeys; _i < outputKeys_1.length; _i++) {
            var outputKey = outputKeys_1[_i];
            _loop_1(outputKey);
        }
        callback(data, outputs);
    };
    Service.prototype.validateTaskNames = function () {
        var _this = this;
        var nonDescribedTasks = Object.keys(this.tasks).filter(function (x) { return !_this.definition.tasks[x]; });
        if (nonDescribedTasks.length > 0) {
            throw new Error("The following tasks are not present in the mesg.yml: " + nonDescribedTasks.join(', '));
        }
        var nonHandledTasks = Object.keys(this.definition.tasks).filter(function (x) { return !_this.tasks[x]; });
        if (nonHandledTasks.length > 0) {
            console.warn("WARNING: The following tasks described in the mesg.yml haven't been implemented: " + nonHandledTasks.join(', '));
        }
    };
    return Service;
}());
exports.default = Service;
//# sourceMappingURL=service.js.map