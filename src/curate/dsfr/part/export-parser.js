import fs from 'fs';
import { PartCurator } from './part-curator.js';

class ExportParser {
  constructor (state) {
    this._state = state;
  }

  async read () {

    this._parts = [];
    const entries = fs.readdirSync(this._state.src, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory() || !this._state.partIds.includes(entry.name)) continue;
      const state = this._state.descend(entry.name);
      const part = new PartCurator(entry.name, state);
      await part.read();
      this._parts.push(part);
    }
  }

  async write () {
    for (const part of this._parts) {
      await part.write();
    }
  }
}

export { ExportParser };
