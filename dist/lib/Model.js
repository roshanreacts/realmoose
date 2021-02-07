"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var realm_1 = __importDefault(require("realm"));
var bson_1 = require("bson");
var lodash_1 = __importDefault(require("lodash"));
var Model = /** @class */ (function () {
    function Model(base, schema) {
        this._base = base;
        this.schema = schema;
        this.path = this._base.path;
        this.realm = new realm_1.default({
            schema: [this.schema.schema],
            path: this.path,
            schemaVersion: this._base.version,
        });
    }
    Model.prototype.__recObj = function (obj) {
        this.doc = obj;
        return this;
    };
    Model.prototype.compile = function () {
        var _this = this;
        return function (doc) {
            _this.doc = doc;
            return _this;
        };
    };
    Model.prototype.validate = function (schemaObj) {
        var _this = this;
        this.schema.unqieFields.map(function (field) {
            if (lodash_1.default.has(schemaObj, field)) {
                var check = _this.findOne(field + " == $0", schemaObj[field]);
                if (check != null) {
                    throw new Error(field + " should have a unique value.");
                }
            }
        });
        return true;
    };
    Model.prototype.create = function (schemaObj) {
        var _this = this;
        var createObj;
        this.validate(schemaObj);
        this.realm.write(function () {
            createObj = _this.realm.create(_this.schema.name, schemaObj);
        });
        return this.__recObj(createObj);
    };
    Model.prototype.findById = function (id) {
        return this.find("_id == $0", typeof id === "object" ? id : new bson_1.ObjectID(id))[0];
    };
    Model.prototype.findOne = function (query, options) {
        return this.find(query, options)[0];
    };
    Model.prototype.find = function (query, options) {
        var _this = this;
        var objInst = this.realm.objects(this.schema.name);
        if (query && bson_1.ObjectID.isValid(options)) {
            return lodash_1.default.map(objInst.filtered(query, options), function (item) {
                return _this.__recObj(item);
            });
        }
        else if (query && typeof options === "object") {
            return lodash_1.default.map(objInst.filtered.apply(objInst, __spreadArrays([query], options)), function (item) {
                return _this.__recObj(item);
            });
        }
        else if (query) {
            return lodash_1.default.map(objInst.filtered(query, options), function (item) {
                return _this.__recObj(item);
            });
        }
        else {
            return lodash_1.default.map(objInst, function (item) { return _this.__recObj(item); });
        }
    };
    Model.prototype.findByIdAndUpdate = function (id, updateObj) {
        var rec = this.findById(id);
        var recObj = rec.toJSON();
        var valObj = lodash_1.default.assign(recObj, updateObj);
        this.validate(valObj);
        this.realm.write(function () {
            lodash_1.default.assign(rec, updateObj);
        });
        return this.__recObj(rec);
    };
    Model.prototype.deleteById = function (id) {
        var _this = this;
        var getById = this.findById(id);
        if (!getById) {
            throw new Error("No item found with this Id");
        }
        this.realm.write(function () {
            _this.realm.delete(getById);
        });
        return true;
    };
    Model.prototype.deleteOne = function (query, options) {
        var _this = this;
        var getOne = this.findOne(query, options);
        if (!getOne) {
            throw new Error("No item found with this Id");
        }
        this.realm.write(function () {
            _this.realm.delete(getOne);
        });
        return true;
    };
    Model.prototype.deleteMany = function (query, options) {
        var _this = this;
        var getAll = this.find(query, options);
        if (!getAll.length) {
            throw new Error("No item found with this Id");
        }
        this.realm.write(function () {
            _this.realm.delete(getAll);
        });
        return true;
    };
    return Model;
}());
exports.default = Model;
