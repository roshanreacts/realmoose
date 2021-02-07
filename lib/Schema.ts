import _ from "lodash";
import { ObjectID } from "bson";

class Schema {
  _base: Realmoose;
  schema: any;
  unqieFields: string[];

  constructor(base: Realmoose, schema: any) {
    this._base = base;
    schema._id = { type: "objectId" };
    this.schema = schema;
    this.unqieFields = [];
    _.forOwn(this.schema, (key: string, val: string) => {
      if (_.has(key, "unique")) {
        this.unqieFields.push(val);
      }
    });
  }

  __generate(doc: any) {
    return { _id: new ObjectID(), ...doc };
  }
}

export default Schema;
