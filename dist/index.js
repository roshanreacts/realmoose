"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Promise_1 = __importDefault(require("./lib/Promise"));
var Schema_1 = __importDefault(require("./lib/Schema"));
var Model_1 = __importDefault(require("./lib/Model"));
var Realmoose = /** @class */ (function () {
    function Realmoose() {
        this.path = "";
        this.version = 0;
    }
    Realmoose.prototype.Model = function (schema) {
        return new Model_1.default(this, schema).compile();
    };
    Realmoose.prototype.Schema = function (obj) {
        return new Schema_1.default(this, obj);
    };
    return Realmoose;
}());
Realmoose.prototype.Promise = {
    get: function () {
        return Promise_1.default.get();
    },
    set: function (lib) {
        Promise_1.default.set(lib);
    },
};
var realmoose = new Realmoose();
exports.default = realmoose;
