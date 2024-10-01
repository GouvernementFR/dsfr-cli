import fs from 'fs';
import yaml from 'yaml';
import semver from 'semver';
import { DocVersion } from './doc-version.js';
import { createFile } from '@gouvfr/dsfr-cli-utils';
import path from 'path';
import { CONFIG_DIR } from '../../constants.js';

class DSFRDocConfigurator {
  async configure (settings) {
    this._versions = [];

    const entries = fs.readdirSync('versions/', { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const version = new DocVersion(`versions/${entry.name}`);
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

    // get i18n and concatene alts

    const data = {
      versions: published.map(version => version.data)
    };

    createFile(`${CONFIG_DIR}/versions.yml`, yaml.stringify(data));
  }
}

export { DSFRDocConfigurator };
