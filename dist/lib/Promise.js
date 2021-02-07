"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromiseProvider = {
    _promise: null,
    get: function () {
        return PromiseProvider._promise;
    },
    set: function (lib) {
        PromiseProvider._promise = lib;
    },
};
PromiseProvider.set(global.Promise);
exports.default = PromiseProvider;
