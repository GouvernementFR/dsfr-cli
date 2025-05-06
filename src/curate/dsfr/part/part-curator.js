import fs from 'fs';
import path from 'path';
import { ImageRefiner } from './image-refiner.js';
import { CONFIG_FOLDER } from '../../../common/constants.js';
import yaml from 'yaml';

class PartCurator {
  constructor (name, state) {
    this._name = name;
    this._state = state;
  }

  get name () {
    return this._name;
  }

  async read () {
    const dataPath = `${CONFIG_FOLDER}/${this._name}/data.yml`;
    if (!fs.existsSync(dataPath)) return;
    const dataFile = fs.readFileSync(dataPath, 'utf8');
    this._data = yaml.parse(dataFile);

    this._images = await this.readImages(this._state);
  }

  async readImages (state) {
    const images = [];
    const entries = fs.readdirSync(state.src, { withFileTypes: true });
    if (entries.length === 0) return images;
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const childState = state.descend(entry.name);
        images.push(...await this.readImages(childState));
      } else {
        if (!entry.name.match(/\.(svg|png|jpg|jpeg)/i)) continue;
        const imgState = state.setData({
          src: path.join(state.src, entry.name),
          dest: `${this._data.src}/_part/doc/_asset/${path.relative(this._state.src, state.src)}/${entry.name}`
        });
        const image = new ImageRefiner(entry.name, imgState);
        images.push(image);
      }
    }
    return images;
  }

  async write () {
    for (const image of this._images) {
      await image.write();
    }
  }
}

export { PartCurator };
