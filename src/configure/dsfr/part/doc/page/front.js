import yaml from 'yaml';

class Front {
  constructor (yml) {
    const data = yaml.parse(yml);
    if (!data.title) {
      throw new Error('Missing title in front');
    }
    this._title = data.title;
    this._breadcrumb = data.breadcrumb;
    this._segment = data.isRoot ? null : data.segment ?? this.createSegment();
    this._template = data.template
    this._meta = data.meta;
  }

  get title () {
    return this._title;
  }

  get breadcrumb () {
    return this._breadcrumb;
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

  createSegment () {
   return this._title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/--/g, '-');
  }
}

export { Front };
