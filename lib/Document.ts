class Document {
  _base: Realmoose;
  _Model: Model;
  constructor(base: Model) {
    this._base = base._base;
    this._Model = base;
  }
  create(obj: any): Document {
    return Object.assign(this, obj);
  }
}

export default Document;
