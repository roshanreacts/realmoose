import Realm from "realm";
import { ObjectID } from "bson";
import _ from "lodash";
import Document from "./Document";

class Model {
  _base: Realmoose;
  _schema: Schema;
  schema: { name: string; primaryKey: string; properties: Schema["schema"] };
  realm: Realm;

  constructor(base: Realmoose, name: string, schema: Schema, version: number) {
    this._base = base;
    this._schema = schema;
    this.schema = {
      name: name,
      primaryKey: "_id",
      properties: schema.schema,
    };
    this.realm = new Realm({
      schema: [this.schema],
      path: this._base.__path,
      schemaVersion: version,
    });
  }
  Document(): Document {
    return new Document(this);
  }

  __recObj(obj: any) {
    return this.Document().create(obj);
  }

  validate(schemaObj: any) {
    this._schema.unqieFields.map((field: any) => {
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
      createObj = this.realm.create(this.schema.name, schemaObj);
    });
    return this.__recObj(createObj);
  }

  findById(id: string | ObjectID): any {
    return this.find(
      "_id == $0",
      typeof id === "object" ? id : new ObjectID(id)
    )[0];
  }

  findOne(query: string, options: any): any {
    return this.find(query, options)[0];
  }

  find(query?: string, options?: any): any {
    const objInst = this.realm.objects(this.schema.name);
    if (query && ObjectID.isValid(options)) {
      return _.map(objInst.filtered(query, options), (item) =>
        this.__recObj(item)
      );
    } else if (query && typeof options === "object") {
      return _.map(objInst.filtered(query, ...options), (item) =>
        this.__recObj(item)
      );
    } else if (query) {
      return _.map(objInst.filtered(query, options), (item) =>
        this.__recObj(item)
      );
    } else {
      return _.map(objInst, (item) => this.__recObj(item));
    }
  }

  findByIdAndUpdate(id: string | ObjectID, updateObj: any): any {
    let rec = this.findById(id);
    const recObj = rec.toJSON();
    const valObj = _.assign(recObj, updateObj);
    this.validate(valObj);
    this.realm.write(() => {
      _.assign(rec, updateObj);
    });
    return this.__recObj(rec);
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

export default Model;
