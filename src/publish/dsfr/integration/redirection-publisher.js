import { Redirection } from '@gouvfr/dsfr-roller'
import { createFile } from '@gouvfr/dsfr-forge';
import fs from 'fs'
import yaml from 'yaml'

class RedirectionPublisher {
  constructor (state) {
    this._state = state;
  }

  async read () {
    const file = fs.readFileSync(this._state.configFile('redirect.yml'), 'utf8');
    const redirectionsData = yaml.parse(file);
    this._redirections = redirectionsData.map(data => new Redirection(data));
  }

  async write () {
    for (const redirection of this._redirections) {
      const html = await redirection.render();
      createFile(this._state.destFile(redirection.dest), html);
    }
  }
}

export { RedirectionPublisher };
