class I18nLocale {
  constructor (data, isDefault = false) {
    this._code = data.code;
    this._isDefault = data.isDefault || isDefault;
    Object.freeze(this);
  }

  get code () {
    return this._code;
  }

  get isDefault () {
    return this._isDefault;
  }

  get data () {
    return {
      code: this._code
    };
  }
}

export { I18nLocale };
