import fs from 'fs';
import semver from 'semver';
import { ArchiveRelease } from './archive-release.js';

class DsfrArchiveConfigurator {
  async configure (settings) {
    this._versions = [];

    const entries = fs.readdirSync('releases/', { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const version = new ArchiveRelease(`releases/${entry.name}`);
        await version.read();
        if (version.isValid) this._versions.push(version);
      }
    }

    const sorted = this._versions.sort((a, b) => semver.compare(b.id, a.id));

    const currentVersion = sorted.find(version => !version.isPrerelease);

    currentVersion.setAsCurrent();

    const majors = sorted.map(version => version.major).filter((major, index, array) => array.indexOf(major) === index);

    for (const major of majors) {
      const latest = sorted.filter(version => version.major === major)[0];
      latest.setAsLatest();
    }

    const published = sorted.filter(version => !version.isPrerelease || semver.gt(version.id, currentVersion.id)).filter((version, index, array) => version === array.find(v => v.feature === version.feature));

    const features = settings.versions.length ? settings.versions : published.map(version => version.feature);

    for (const version of published) {
      await version.write(features.includes(version.feature));
    }
  }
}

export { DsfrArchiveConfigurator };
