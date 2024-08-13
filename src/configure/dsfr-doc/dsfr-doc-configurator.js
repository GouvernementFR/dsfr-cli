import { DocVersion } from './doc-version.js';
import fs from 'fs';
import semver from 'semver';

class DSFRDocConfigurator {
  async configure (settings) {
    this._versions = [];

    const entries = fs.readdirSync('versions/', { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const version = new DocVersion(`versions/${entry.name}/`);
        await version.read();
        if (version.isValid) this._versions.push(version);
      }
    }

    const sorted = this._versions.sort((a, b) => semver.compare(b.id, a.id));

    const currentVersion = sorted.filter(version => !version.isPrerelease)[0];

    currentVersion.setAsCurrent();

    const published = sorted.filter(version => !version.isPrerelease || semver.gt(version.id, currentVersion.id)).filter((version, index, array) => version === array.find(v => v.feature === version.feature));

    const features = settings.versions.length ? settings.versions : published.map(version => version.feature);

    for (const version of published) {
      await version.write(features.find(feature => version.feature === feature));
    }

    const data = {
      versions: published.map(version => version.data)
    };



  }
}

export { DSFRDocConfigurator };
