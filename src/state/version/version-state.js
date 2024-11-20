import semver from 'semver';

class VersionState {
  constructor () {
    this._isPrerelease = false;
    this._isCurrent = false;
  }

  parse (version) {
    this._id = version;
    this._isPrerelease = semver.prerelease(version) !== null;
    this._major = semver.major(version);
    this._minor = semver.minor(version);
    this._patch = semver.patch(version);
    this._feature = `${this._major}.${this._minor}`;
    this._core = `${this._major}.${this._minor}.${this._patch}`;
    this._label = `v${this._feature}`;
    this._isCurrent = false;
    Object.freeze(this);
  }

  fill (data) {
    this._id = data.id;
    this._isPrerelease = data.isPrerelease;
    this._major = data.major;
    this._minor = data.minor;
    this._patch = data.patch;
    this._feature = data.feature;
    this._core = data.core;
    this._label = data.label;
    this._isCurrent = data.isCurrent;
    Object.freeze(this);
  }

  _clone () {
    const clone = new VersionState();
    clone._id = this._id;
    clone._isPrerelease = this._isPrerelease;
    clone._major = this._major;
    clone._minor = this._minor;
    clone._patch = this._patch;
    clone._feature = this._feature;
    clone._core = this._core;
    clone._label = this._label;
    clone._isCurrent = this._isCurrent
    return clone;
  }

  clone () {
    const clone = this._clone();
    Object.freeze(clone);
    return clone;
  }

  get id () {
    return this._id;
  }

  get isPrerelease () {
    return this._isPrerelease;
  }

  get major () {
    return this._major;
  }

  get minor () {
    return this._minor;
  }

  get patch () {
    return this._patch;
  }

  get feature () {
    return this._feature;
  }

  get core() {
    return this._core;
  }

  get label () {
    return this._label;
  }

  get isCurrent () {
    return this._isCurrent;
  }

  get data() {
    return {
      id: this._id,
      isPrerelease: this._isPrerelease,
      major: this._major,
      minor: this._minor,
      patch: this._patch,
      feature: this._feature,
      core: this._core,
      label: this._label,
      isCurrent: this._isCurrent
    };
  }
}

export { VersionState };
