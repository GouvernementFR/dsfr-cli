import { log } from '../index.js';
import deepMerge from 'deepmerge';

class TagAttributes {
  constructor () {
    this._classes = [];
    this._attributes = {};
  }

  setClasses (classes) {
    this._classes = classes;
  }

  addClass (className) {
    this._classes.push(className);
  }

  setAttribute (name, value) {
    if (value === undefined || value === null) {
      log.warn(`Trying to set an undefined or null attribute ${name}`);
      return;
    }
    this._attributes[name] = value;
  }

  getAttributes () {
    const attributes = structuredClone(this._attributes);
    const classes = this._classes.slice() || [];
    if (attributes.class) classes.push(...attributes.class.split(' '));
    if (classes.length) attributes.class = classes.join(' ');
    return attributes;
  }

  render () {
    const attributes = this.getAttributes();
    const entries = Object.entries(attributes);
    if (!entries.length) return '';
    return entries.map(([key, value]) => ` ${key}="${value}"`).join('');
  }
}

export { TagAttributes };
