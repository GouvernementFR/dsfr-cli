import { getState } from '../../state/state.js';
import { PartInterpreter } from './part/part-interpreter.js';
import { CONFIG_DIR } from '../../constants.js';
class DSFRInterpreter {
  async interpret (settings) {
    const state = await getState({ src: CONFIG_DIR, dest: CONFIG_DIR });
    const partIds = settings.partIds ? state.partIds.filter(id => settings.partIds.includes(id)) : state.partIds;

    this._parts = [];

    for (const id of partIds) {
      const partState = state.descend(id, id);
      const part = new PartInterpreter(partState);
      this._parts.push(part);
      await part.read();
    }

    for (const part of this._parts) {
      await part.interpret();
    }

    for (const part of this._parts) {
      await part.write();
    }
  }
}

export { DSFRInterpreter };
