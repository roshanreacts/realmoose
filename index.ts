import SchemaClass from "./lib/Schema";
import Model from "./lib/Model";

class Realmoose {
  __path: string;
  constructor() {
    this.__path = "";
  }

  connect(path: string) {
    this.__path = path;
  }

  Schema(schema: any): SchemaClass {
    return new SchemaClass(this, schema);
  }

  Model(name: string, schema: Schema, version: number) {
    return new Model(this, name, schema, version);
  }
}

const realmoose = new Realmoose();

export default realmoose;
