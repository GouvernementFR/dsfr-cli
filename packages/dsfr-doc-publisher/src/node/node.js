import { Renderable } from '../core/renderable.js';
import { nodeFactory } from './node-factory.js';
import { log, normalize, TagAttributes } from '@gouvfr/dsfr-cli-utils';
class Node extends Renderable {
  constructor (data, tagName = null, isSelfClosing = false, hasNormalizedId = false) {
    super(data);
    this._tagName = tagName || data.tagName;
    this._isSelfClosing = isSelfClosing;
    this._hasNormalizedId = hasNormalizedId;
    this._type = data.type;
    this._children = Array.isArray(this.data.children) ? this.data.children.map(childData => nodeFactory(childData)) : [];
    if (typeof this.data?.attributes === 'object' && Object.keys(this.data.attributes).length > 0) {
      Object.entries(this.data.attributes).forEach(([key, value]) => {
        this.attributes.setAttribute(key, value);
      });
    }
    if (typeof this.data?.classes === 'object' && Array.isArray(this.data.classes)) {
      this.attributes.setClasses(this.data.classes);
    }
  }

  get children () {
    return this._children;
  }

  get type () {
    return this._type;
  }

  set tagName (value) {
    this._tagName = value;
  }

  get tagName () {
    return this._tagName;
  }

  get isSelfClosing () {
    return this._isSelfClosing;
  }

  get hasNormalizedId () {
    return this._hasNormalizedId;
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

    if (!this.tagName) return html;

    if (this.hasNormalizedId) {
      this.attributes.setAttribute('id', normalize(html));
    }

    return this.isSelfClosing ? `<${this.tagName}${this.renderAttributes()}/>` : `<${this.tagName}${this.renderAttributes()}>${html}</${this.tagName}>`;
  }
}

export { Node };
