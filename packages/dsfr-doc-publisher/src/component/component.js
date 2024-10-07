import render from './render.js';
import deepmerge from 'deepmerge';
import { Renderable } from '../core/renderable.js';

class Component extends Renderable {
  constructor (data, id, pkg = undefined) {
    super(data);
    this._id = id;
    this._pkg = pkg;
  }

  get id () {
    return this._id;
  }

  get ejsPath () {
    return null;
  }

  async format () {
    return this._data;
  }

  async render (renderingData) {
    if (!this.ejsPath) {
      throw new Error('The ejsPath property must be defined');
    }
    const formatedData = await this.format();
    const mergedData = renderingData ? deepmerge(formatedData, renderingData) : formatedData;

    const data = {
      [this.id]: mergedData
    }

    return await render(this.ejsPath, data, this._pkg);
  }
}

export { Component };
