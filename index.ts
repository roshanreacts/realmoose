import SchemaClass from "./lib/Schema";
import { default as ModelClass } from "./lib/Model";

class Realmoose {
  __path?: string;
  __appId?: string;
  sync: boolean;
  constructor() {
    this.__path = "";
    this.__appId = "";
    this.sync = false;
  }

  connect(options: { path?: string; appId?: string }) {
    this.__path = options.path;
    this.__appId = options.appId;
    if (options.appId) {
      this.sync = true;
    }
  }

  Schema(schema: any): SchemaClass {
    return new SchemaClass(this, schema);
  }

  Model(name: string, schema: SchemaType, version: number) {
    return new ModelClass(this, name, schema, version);
  }
}

const realmoose = new Realmoose();

export const Schema = realmoose.Schema;
export const Model = realmoose.Model;

export default realmoose;
