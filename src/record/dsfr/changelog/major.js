import { Minor } from './minor.js';

class Major {

  constructor (id) {
    this._id = id;
    this._minors = [];
  }

  get id () {
    return this._id;
  }

  getMinor (id) {
    const minor = this._minors.find(minor => minor.id === id);
    if (minor) return minor;
    const newMinor = new Minor(id, `${this._id}.${id}`);
    this._minors.push(newMinor);
    this._minors.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    return newMinor;
  }

  add (release) {
    const minor = this.getMinor(release.minor);
    minor.add(release);
  }

  render () {
    return this._minors.map(minor => minor.render()).join('');
  }

}

export { Major };
