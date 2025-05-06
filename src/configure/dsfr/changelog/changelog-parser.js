import { copyFile, createFile } from '@gouvfr/dsfr-forge';
import yaml from 'yaml'
import fs from 'fs';

class ChangelogParser {
  constructor (state, partIds) {
    this._state = state;
    this._partIds = partIds;
  }

  async read () {
    const changelogFile = fs.readFileSync(`${this._state.root}/changelog.yml`, 'utf8');
    this._changelog = yaml.parse(changelogFile);
  }

  async write () {
    copyFile(`${this._state.root}/changelog.yml`, this._state.configFile('changelog.yml'));

    for (const partId of this._partIds) {
      const state = this._state.setPart(partId);
      const changelog = this._changelog.map(tag => {
        const newTag = { ...tag };
        newTag.commits = tag.commits.filter(commit => commit.scopes.includes(partId) || commit.scopes.includes(`${partId}s-group`));
        return newTag;
      }).filter(tag => tag.commits.length > 0);
      createFile(state.configFile('changelog.yml'), yaml.stringify(changelog));
    }
  }
}

export { ChangelogParser };
