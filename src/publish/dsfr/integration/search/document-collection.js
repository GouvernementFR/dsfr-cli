class DocumentCollection {
  constructor (locale) {
    this._locale = locale;
    this._documents = [];
  }

  get locale () {
    return this._locale;
  }

  get documents () {
    return this._documents;
  }

  index () {
    this._documents.forEach((document, index) => document.id = index);
  }

  add (...documents) {
    this._documents.push(...documents);
  }
}

export { DocumentCollection };
