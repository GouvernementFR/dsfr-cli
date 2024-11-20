import { Renderable } from '../core/renderable.js';
import { nodeFactory } from './node-factory.js';
import { log, TagAttributes } from '@gouvfr/dsfr-cli-utils';
class Node extends Renderable {
  constructor (data) {
    super(data);
    this._type = data.type;
    this._children = Array.isArray(this.data.children) ? this.data.children.map(childData => nodeFactory(childData)) : [];
    if (typeof this.data?.attributes === 'object' && Object.keys(this.data.attributes).length > 0) {
      Object.entries(this.data.attributes).forEach(([key, value]) => {
        this.attributes.setAttribute(key, value);
      });
    }
  }

  get children () {
    return this._children;
  }

  get type () {
    return this._type;
  }

  get attributes () {
    if (!this._attributes) {
      this._attributes = new TagAttributes();
    }
    return this._attributes;
  }

  renderAttributes () {
    return this._attributes ? this._attributes.render() : '';
  }

  getAttributes () {
    return this._attributes ? this._attributes.getAttributes() : {};
  }

  findDescendantsByType (type) {
    const descendants = [];
    for (const child of this._children) {
      if (child.type === type) descendants.push(child);
      descendants.push(...child.findDescendantsByType(type));
    }
    return descendants;
  }

  async render () {
    let html = '';
    for (const child of this._children) {
      html += await child.render();
    }
    return html;
  }
}

export { Node };
