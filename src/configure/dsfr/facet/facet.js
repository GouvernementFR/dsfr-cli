import semver from 'semver';
class Facet {
  constructor (name, version) {
    this._name = name;
    const filenameRegex = /\/?([a-zA-Z0-9-_]+)[@|#|\.]/g.exec(name);
    this._filename = filenameRegex[1];
    const localRegex = /@([a-z]{2}(-[A-Z]{2})?)/.exec(name);
    this._isAlt = localRegex !== null;
    if (this._isAlt) this._localeCode = localRegex[1];

    const rangeRegex = /#(.+)\.md$/.exec(name);
    this._hasRange = rangeRegex !== null;

    this._isSatisfying = !this._hasRange || semver.satisfies(version, rangeRegex[1]);

    this._relevance = ((this._isAlt | 0) << 1) | + (this._hasRange | 0);
  }

  get name () {
    return this._name;
  }

  get filename () {
    return this._filename
  }

  get isAlt () {
    return this._isAlt;
  }

  testFilename (filename = null) {
    if (filename === null) return true;
    return this._filename === filename;
  }

  testLocale (code) {
    return this._localeCode === code;
  }

  get isSatisfying () {
    return this._isSatisfying;
  }

  get relevance () {
    return this._relevance;
  }
}

export { Facet };
