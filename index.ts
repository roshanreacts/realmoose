import Realm from "realm";
import { ObjectID } from "bson";
import _ from "lodash";

export class Schema {
    name: string;
    schema: any;
    unqieFields: string[];

    constructor(schema: any) {
        schema.properties._id = { type: "objectId" };
        schema.primaryKey = '_id';
        this.name = schema.name;
        this.schema = schema;
        this.unqieFields = [];
        _.forOwn(this.schema.properties, (key: string, val: string) => {
            if (_.has(key, "unique")) {
                this.unqieFields.push(val);
            }
        });
    }
}

export class Model {
    schema: Schema;
    path: string;
    realm: Realm;
    _recOptions: {
        delete: Function,
        update: Function
    }
    constructor(schema: Schema, path: string, ver: number) {
        this.schema = schema;
        this.path = path;
        this.realm = new Realm({
            schema: [this.schema.schema],
            path: this.path,
            schemaVersion: ver,
        });
        this._recOptions = {
            delete: () => {
                console.log(this);
            },
            update: () => {
                console.log(this);
            }
        }
    }
    _realmRecord(rec: any): any {
        return Object.assign(rec, this._recOptions);
    }
    validate(schemaObj: any) {
        this.schema.unqieFields.map((field) => {
            if (_.has(schemaObj, field)) {
                const check = this.findOne(`${field} == $0`, schemaObj[field]);
                if (check != null) {
                    throw new Error(`${field} should have a unique value.`);
                }
            }
        });
        return true;
    }
    create(schemaObj: any): any {
        let createObj;
        this.validate(schemaObj);
        this.realm.write(() => {
            createObj = this.realm.create(this.schema.name, {
                _id: new ObjectID(),
                ...schemaObj,
            });
        });
        return this._realmRecord(createObj);
    }

    findById(id: string | ObjectID): any {
        return this.find("_id == $0", typeof id === "object" ? id : new ObjectID(id))[0];
    }

    findOne(query: string, options: any): any {
        return this.find(query, options)[0];
    }

    find(query?: string, options?: any): any {
        const objInst = this.realm.objects(this.schema.name);
        if (query && ObjectID.isValid(options)) {
            return _.map(objInst.filtered(query, options), (item) => this._realmRecord(item));
        } else if (query && typeof options === "object") {
            return _.map(objInst.filtered(query, ...options), (item) => this._realmRecord(item));
        }
        else if (query) {
            return _.map(objInst.filtered(query, options), (item) => this._realmRecord(item));
        } else {
            return _.map(objInst, (item) => this._realmRecord(item));
        }
    }

    findByIdAndUpdate(id: string | ObjectID, updateObj: any): any {
        let rec = this.findById(id);
        const recObj = rec.toJSON();
        const valObj = Object.assign(recObj, updateObj);
        this.validate(valObj);
        this.realm.write(() => {
            Object.assign(rec, updateObj);
        });
        return rec;
    }

    deleteById(id: string | ObjectID): boolean {
        const getById = this.findById(id);
        if (!getById) {
            throw new Error("No item found with this Id");
        }
        this.realm.write(() => {
            this.realm.delete(getById);
        });
        return true;
    }

    deleteOne(query: string, options: any): boolean {
        const getOne = this.findOne(query, options);
        if (!getOne) {
            throw new Error("No item found with this Id");
        }
        this.realm.write(() => {
            this.realm.delete(getOne);
        });
        return true;
    }
    deleteMany(query: string, options: any): boolean {
        const getAll = this.find(query, options);
        if (!getAll.length) {
            throw new Error("No item found with this Id");
        }
        this.realm.write(() => {
            this.realm.delete(getAll);
        });
        return true;
    }
}
