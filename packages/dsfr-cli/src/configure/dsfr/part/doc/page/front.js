import yaml from 'yaml';
import { normalize } from '@gouvfr/dsfr-cli-utils';

class Front {
  constructor (yml) {
    const data = yaml.parse(yml);
    if (!data.title) {
      throw new Error('Missing title in front');
    }
    this._title = data.title;
    this._shortTitle = data.shortTitle ?? data.title;
    this._sort = data.sort;
    this._segment = data.isRoot ? null : normalize(data.segment ?? data.title);
    this._template = data.template
    this._meta = data.meta;
  }

  get title () {
    return this._title;
  }

  get shortTitle () {
    return this._shortTitle;
  }

  get sort () {
    return this._sort;
  }

  get template () {
    return this._template;
  }

  get segment () {
    return this._segment;
  }

  get meta () {
    return this._meta;
  }
}

export { Front };
