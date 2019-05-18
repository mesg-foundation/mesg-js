"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleAPIResponse = function (resolve, reject) { return function (err, res) {
    err ? reject(err) : resolve(res);
}; };
exports.handleAPIResponse = handleAPIResponse;
//# sourceMappingURL=api.js.map