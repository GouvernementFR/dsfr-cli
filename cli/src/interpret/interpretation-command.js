import { Command, CommandOption } from '../command.js';
import { Interpretation } from './interpretation.js';

class InterpretationCommand extends Command{
  constructor () {
    super('interpret', 'Interpretation des markdown');
  }

  get usage () {
    return '';
  }

  get example () {
    return '';
  }

  get options () {
    return [
      new CommandOption('parts', 'limite la configuration aux parties listées', 'array', 'p')
    ];
  }

  async handler (argv) {
    const settings = {
      parts: argv.parts ?? []
    };

    const interpretation = new Interpretation();
    await interpretation.interpret(settings);
  }
}

export { InterpretationCommand };
