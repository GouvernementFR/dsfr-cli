import semver from 'semver';
import fs from 'fs';
import yaml from 'yaml';

const parse = (data, suffix = '') => {
  const type = typeof data;
  switch (true) {
    case type === 'string':
    case type === 'number':
    case type === 'boolean':
      return data;

    case Array.isArray(data):
      return data.map(item => parse(item, suffix));
  }

  if (typeof data !== 'object') return data;

  const keys = Object.keys(data).map(key => key.split('@')[0]).filter((key, index, array) => array.indexOf(key) === index);
  if (keys.length === 0) return data;

  const parsed = {};

  for (const key of keys) {
    parsed[key] = parse(data[`${key}${suffix}`] ?? data[key], suffix);
  }

  return parsed;
};

class Facet {
  constructor (name, version, directory) {
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

    this._src = `${directory}/${name}`;
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

  load (code = null) {
    const yml = fs.readFileSync(this._src, 'utf8');
    if (!yml) return null;
    const data = yaml.parse(yml);
    const suffix = code === null ? '' : `@${code}`;
    return parse(data, suffix);
  }

  get isSatisfying () {
    return this._isSatisfying;
  }

  get relevance () {
    return this._relevance;
  }
}

export { Facet };
