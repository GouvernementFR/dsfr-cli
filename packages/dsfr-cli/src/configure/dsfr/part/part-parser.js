import fs from 'fs';
import yaml from 'yaml';
import { createFile, log } from '@gouvfr/dsfr-cli-utils';
import { DocParser } from './doc/doc-parser.js';
import { CONFIG_DIR } from '../../../constants.js';

const getPartDataSrc = (state) => `${state.src}/_part/data.yml`;

class PartParser {
  constructor (state, parent) {
    this._state = state;
    this._parent = parent;
    this._ascendants = parent ? [parent, ...parent.ascendants] : [];
    this._depth = parent ? parent.depth + 1 : 0;
    this._root = parent ? parent.root : this;
    this._children = [];
    this._descendants = [];
    this._has = false;
    this._isDraft = false;
    this._isDetached = false;
    this._isIgnored = false;
    this._map = {};
  }

  get id () {
    return this._id;
  }

  get has () {
    return this._has;
  }

  get isDraft () {
    return this._isDraft;
  }

  get isDetached () {
    return this._isDetached;
  }

  get children () {
    return this._children;
  }

  get parent () {
    return this._parent;
  }

  get state () {
    return this._state;
  }

  get data () {
    return this._data;
  }

  get ascendants () {
    return this._ascendants
  }

  get depth () {
    return this._depth;
  }

  get root () {
    return this._root;
  }

  get descendants () {
    return this._descendants;
  }

  get doc () {
    return this._doc;
  }

  get map () {
    return this._map;
  }

  getPart (id) {
    return this.root.id === id ? this.root : this.root.descendants.find(descendant => descendant.id === id);
  }

  async read () {
    const dataSrc = getPartDataSrc(this._state);
    if (!fs.existsSync(dataSrc)) return;
    const fileContents = fs.readFileSync(dataSrc, 'utf8');
    this._data = yaml.parse(fileContents);
    this._isIgnored = this._data.isIgnored === true;
    if (this._isIgnored) return;
    this._id = this._data.id;
    this._state = this._state.setDest(`${CONFIG_DIR}/${this._id}`)
    const duplicated = this.root.descendants.filter(part => part.id === this._id)
    if (duplicated.length) {
      log.error(`Part with id '${this._id}' (${this.src}) already exists in [${duplicated.map(part => part.src).join(',')}]`);
      return;
    }
    this._has = true;
    this._isDraft = this._data.isDraft === true;
    this._isDetached = this._data.isDetached === true;

    await this.readDoc(this._data.doc);

    await this.readChildren();
  }

  async readDoc (data = {}) {
    const docState = data.isStatic ? this._state.statify(this._id) : this._state.descend('_part/doc');

    const doc = new DocParser(docState, null, this, this._id);
    await doc.read();
    if (!doc.has) return;
    this._doc = doc;
    this._map = doc.map;
  }

  async readChildren () {
    const entries = fs.readdirSync(this.state.src, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name === '_part') continue;
      const state = this._state.descend(entry.name);
      if (!fs.existsSync(getPartDataSrc(state))) continue;
      const child = new PartParser(state, this);
      await child.read();
      if (!child.has) continue;
      this._children.push(child);
      this._descendants.push(child, ...child.descendants);
      this._map[child.id] = child.map;
    }
  }

  async write () {
    const data = {
      id: this._id,
      src: this._state.src,
      banner: this._state.banner,
      isDraft: this._isDraft,
      isDetached: this._isDetached,
      parent: this._parent?.id,
      children: this._children.map(child => child.id),
      ascendants: this._ascendants.map(ascendant => ascendant.id),
      depth: this._depth,
      descendants: this._descendants.map(descendant => descendant.id)
    };

    if (this._doc) {
      data.doc = this._doc.data;
    }

    createFile(this.state.destFile('data.yml'), yaml.stringify(data));

    if (this._doc) await this._doc.write();

    for (const child of this._children) await child.write();
  }
}

export { PartParser };
