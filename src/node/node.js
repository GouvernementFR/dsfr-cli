import { Renderable } from '../core/renderable.js';
import { nodeFactory } from './node-factory.js';
import { log, normalize, TagAttributes } from '@gouvfr/dsfr-forge';
class Node extends Renderable {
  constructor (data, tagName = null, isSelfClosing = false, hasNormalizedId = false) {
    super(data);
    this._tagName = tagName || this.data.tagName;
    this._isSelfClosing = isSelfClosing;
    this._hasNormalizedId = hasNormalizedId;
    this._type = this.data.type;
    this._children = Array.isArray(this.data.children) ? this.data.children.map(childData => nodeFactory.create(childData)) : [];
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

  async renderChildren () {
    let html = '';
    for (const child of this._children) {
      html += await child.render();
    }
    return html;
  }

  async render () {
    const html = await this.renderChildren();

    if (!this.tagName) return html;

    if (this.hasNormalizedId) {
      this.attributes.setAttribute('id', normalize(this.text));
    }

    return this.isSelfClosing ? `<${this.tagName}${this.renderAttributes()}/>` : `<${this.tagName}${this.renderAttributes()}>${html}</${this.tagName}>`;
  }

  get text () {
    return this._children.map(child => child.text).join(' ');
  }

  static getImageChild (data) {
    if (data.type === 'image') return data;
    if (data.children) {
      for (const child of data.children) {
        const image = Node.getImageChild(child);
        if (image) return image;
      }
    }
    return null;
  }
}

export { Node };
