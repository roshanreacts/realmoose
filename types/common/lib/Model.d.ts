interface Model {
  _base: Realmoose;
  _schema: Schema;
  schema: { name: string; primaryKey: string; properties: Schema["schema"] };
  realm: Realm;
  validate: Function;
}
