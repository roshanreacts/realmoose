"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var bson_1 = require("bson");
var Schema = /** @class */ (function () {
    function Schema(base, schema) {
        var _this = this;
        this._base = base;
        schema.properties._id = { type: "objectId" };
        schema.primaryKey = "_id";
        this.name = schema.name;
        this.schema = schema;
        this.unqieFields = [];
        lodash_1.default.forOwn(this.schema.properties, function (key, val) {
            if (lodash_1.default.has(key, "unique")) {
                _this.unqieFields.push(val);
            }
        });
    }
    Schema.prototype.__generate = function (doc) {
        return __assign({ _id: new bson_1.ObjectID() }, doc);
    };
    return Schema;
}());
exports.default = Schema;
