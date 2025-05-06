import { getStates } from '../../common/state/state.js';
import { PartInterpreter } from './part/part-interpreter.js';

class DsfrInterpreter {
  async interpret (settings) {
    const states = await getStates();

    for (const state of states) {
      await this._interpret(settings, state);
    }
  }

  async _interpret (settings, state) {

    const partIds = settings.partIds ? state.partIds.filter(id => settings.partIds.includes(id)) : state.partIds;

    this._parts = [];

    for (const id of partIds) {
      const partState = state.setPart(id);
      const part = new PartInterpreter(partState);
      this._parts.push(part);
      await part.read();
    }

    for (const part of this._parts) {
      await part.write();
    }
  }
}

export { DsfrInterpreter };
