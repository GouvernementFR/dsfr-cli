class TemplateFactory {
  constructor () {
    this._constructors = {};
    this._defaultConstructor = null;
  }

  register (type, templateConstructor, isDefault = false) {
    this._constructors[type] = templateConstructor;
    if (!isDefault) return;
    if (this._defaultConstructor !== null) throw new Error ('default template already defined');
    this._defaultConstructor = templateConstructor;
  }

  _getTemplateConstructor (type) {
    return this._constructors[type] ?? this._defaultConstructor;
  }

  create (data) {
    const templateConstructor = this._getTemplateConstructor(data.template);
    return new templateConstructor(data);
  }
}

const factory = new TemplateFactory();

export default factory;
