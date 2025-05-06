import { GitParser } from './parse/git-parser.js';
import { Changelog } from './changelog/changelog.js';
import { createFile } from '@gouvfr/dsfr-forge';

class DsfrRecorder {
  constructor (pck) {
    this._version = pck.version;
    this._major = pck.version.split('.').shift();
  }
  async record (settings) {
    const gitParser = new GitParser(this._version, this._major);
    await gitParser.read();
    await gitParser.write();

    const changelog = new Changelog(gitParser.data);
    createFile('./CHANGELOG.md', changelog.render());
  }
}

export { DsfrRecorder };
