"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var bson_1 = require("bson");
var Realm = /** @class */ (function () {
    function Realm() {
    }
    return Realm;
}());
Realm.prototype.write = function (callback) {
    callback();
};
Realm.prototype.create = function (name, schemaObj) {
    return schemaObj;
};
Realm.prototype.delete = function () {
    return true;
};
Realm.prototype.objects = function () {
    return { filtered: filtered };
};
var filtered = function (args, args2, args3, args4) {
    var val = typeof args2 === "object"
        ? bson_1.ObjectID.isValid(args2)
            ? new bson_1.ObjectID(args2).toString()
            : args2[0]
        : args2;
    var arr = [
        {
            _id: "5fd371f50606aa3727985e2b",
            make: "BWM",
            model: "Good2",
            miles: 200,
        },
        {
            _id: "5fd3723172bf3a454d019f40",
            make: "BWM",
            model: "Good2",
            miles: 200,
        },
    ];
    var querySplit = args.split("=");
    // Filter the array and return mock data
    return lodash_1.default.filter(arr, [querySplit[0].trim(), val]).map(function (item) {
        var method = {
            toJSON: function () {
                return this;
            }
        };
        return Object.assign(item, method);
    });
};
exports.default = Realm;
