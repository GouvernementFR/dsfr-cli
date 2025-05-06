import yaml from 'yaml';
import { normalize } from '@gouvfr/dsfr-forge';

class Front {
  constructor (yml) {
    const data = yaml.parse(yml);
    if (!data.title) {
      throw new Error('Missing title in front');
    }
    this._title = data.title;
    this._shortTitle = data.shortTitle ?? data.title;
    this._cover = data.cover;
    this._description = data.description ?? data.excerpt ?? data.summary;
    this._shortDescription = data.shortDescription ?? data.description ?? data.excerpt ?? data.summary;
    this._keywords = data.keywords;
    this._summary = data.summary ?? data.excerpt ?? data.description;
    this._excerpt = data.excerpt ?? data.description ?? data.summary;
    this._boost = data.boost ?? 1;
    this._sort = data.sort;
    this._order = data.order;
    this._priority = data.priority;
    this._published = data.published;
    this._segment = data.isRoot ? null : normalize(data.segment ?? data.title);
    this._template = data.template;
    this._scripts = data.scripts ?? [];
    this._styles = data.styles ?? [];
    this._meta = data.meta;
  }

  get title () {
    return this._title;
  }

  get shortTitle () {
    return this._shortTitle;
  }

  get cover () {
    return this._cover;
  }

  get description () {
    return this._description;
  }

  get shortDescription () {
    return this._shortDescription;
  }

  get keywords () {
    return this._keywords;
  }

  get summary () {
    return this._summary;
  }

  get excerpt () {
    return this._excerpt;
  }

  get boost () {
    return this._boost;
  }

  get sort () {
    return this._sort;
  }

  get order () {
    return this._order;
  }

  get priority () {
    return this._priority;
  }

  get published () {
    return this._published;
  }

  get template () {
    return this._template;
  }

  get scripts () {
    return this._scripts;
  }

  get styles () {
    return this._styles;
  }

  get segment () {
    return this._segment;
  }

  get meta () {
    return this._meta;
  }
}

export { Front };
