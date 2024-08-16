class I18nLocale {
  constructor (data) {
    this._data = data;
    Object.freeze(this._data);
    this._code = data.code;
    this._isDefault = data.isDefault;
  }

  parse (locales) {
    this._name = {};
    locales.forEach(locale => {
      this._name[locale.code] = this._data[`name@${locale.code}`] ?? this._data.name;
    });
    Object.freeze(this._name);
  }

  get code () {
    return this._code;
  }

  get isDefault () {
    return this._isDefault;
  }

  get data () {
    return {
      code: this._code,
      name: this._name
    };
  }
}

export { I18nLocale };
