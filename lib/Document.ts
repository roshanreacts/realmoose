class Document {
  _base: Realmoose;
  _Model: Model;
  realm: Realm;
  constructor(base: Model) {
    this._base = base._base;
    this._Model = base;
    this.realm = this._Model.realm;
  }
  create(obj: any) {
    return Object.assign(this, obj);
  }
  save() {
    let newDoc;
    let _this: any = this;
    this._Model.validate(_this, true);
    this.realm.write(() => {
      newDoc = this.realm.create(this._Model.schema.name, _this);
    });
    return this.create(newDoc);
  }
  delete(): boolean {
    let _this: any = this;
    this.realm.write(() => {
      this.realm.delete(_this);
    });
    return true;
  }
}

export default Document;
