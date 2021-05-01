interface Model {
  _base: Realmoose;
  _schema: SchemaType;
  schema: { name: string; primaryKey: string; properties: Schema["schema"] };
  realm: Realm;
  validate: Function;
}
