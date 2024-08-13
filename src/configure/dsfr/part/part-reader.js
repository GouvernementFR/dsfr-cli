import fs from 'fs';
import yaml from 'yaml';
import { createFile } from '../../../utilities/file.js';
import log from '../../../utilities/log.js'

class PartReader {
  constructor (state, parent) {
    this._state = state;
    this._parent = parent;
    this._ascendants = parent ? [parent, ...parent.ascendants] : [];
    this._depth = parent ? parent.depth + 1 : 0;
    this._root = parent ? parent.root : this;
    this._children = [];
    this._descendants = [];
    this._isValid = false;
    this._isDraft = false;
    this._isDetached = false;
    this._isIgnored = false;
  }

  get id () {
    return this._id;
  }

  get isValid () {
    return this._isValid;
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

  get src () {
    return this._state.src;
  }

  get dest () {
    return this._state.dest;
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

  get hasDoc () {
    return this._hasDoc;
  }

  getPart (id) {
    return this.root.id === id ? this.root : this.root.descendants.find(descendant => descendant.id === id);
  }

  linkDoc (doc) {
    this._doc = doc;
  }

  async read () {
    const dataSrc = `${this.src}_part/data.yml`;
    if (!fs.existsSync(dataSrc)) return;
    const fileContents = fs.readFileSync(dataSrc, 'utf8');
    this._data = yaml.parse(fileContents);
    this._isIgnored = this._data.isIgnored === true;
    if (this._isIgnored) return;
    this._id = this._data.id;
    const duplicated = this.root.descendants.filter(part => part.id === this._id)
    if (duplicated.length) {
      log.error(`Part with id '${this._id}' (${this.src}) already exists in [${duplicated.map(part => part.src).join(',')}]`);
      return;
    }
    this._isValid = true;
    this._isDraft = this._data.isDraft === true;
    this._isDetached = this._data.isDetached === true;

    this._hasDoc = fs.existsSync(`${this.src}doc/index.md`);

    const entries = fs.readdirSync(this.src, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== '_part') {
        const state = this._state.descend(entry.name);
        const child = new PartReader(state, this);
        await child.read();
        if (child.isValid) {
          this._children.push(child);
          this._descendants.push(child, ...child.descendants);
        }
      }
    }
  }

  async write () {
    const data = {
      id: this._id,
      src: this.src,
      isDraft: this._isDraft,
      isDetached: this._isDetached,
      parent: this._parent?.id,
      children: this._children.map(child => child.id),
      ascendants: this._ascendants.map(ascendant => ascendant.id),
      depth: this._depth,
      descendants: this._descendants.map(descendant => descendant.id)
    };

    createFile(`${this.dest}${this.id}.yml`, yaml.stringify(data));

    for (const child of this._children) await child.write();
  }
}

export { PartReader };
