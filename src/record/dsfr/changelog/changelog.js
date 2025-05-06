import { Release } from './release.js';
import { Major } from './major.js';

class Changelog {
  constructor (data) {
    this._majors = [];
    for (const releaseData of data) this.add(new Release(releaseData));
  }

  getMajor (id) {
    const major = this._majors.find(major => major.id === id);
    if (major) return major;
    const newMajor = new Major(id);
    this._majors.push(newMajor);
    this._majors.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    return newMajor;
  }

  add (release) {
    const major = this.getMajor(release.major);
    major.add(release);
  }

  render () {
    return `# Changelog du Système de design de l’État

Toutes les modifications notables apportées à ce projet sont documentées dans ce fichier.

Ce projet respecte [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Pour plus d’informations : [Voir la documentation](https://www.systeme-de-design.gouv.fr/)


${this._majors.map(major => major.render()).join('')}`;
  }
}

export { Changelog };
