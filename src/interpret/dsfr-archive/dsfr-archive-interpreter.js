import { DsfrInterpreter } from '../dsfr/dsfr-interpreter.js';

class DsfrArchiveInterpreter {
  async interpret (settings) {
    const interpreter = new DsfrInterpreter();
    await interpreter.interpret(settings);
  }
}

export { DsfrArchiveInterpreter };
