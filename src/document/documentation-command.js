import { Command, CommandOption } from '../command.js';
import { Documentation } from './documentation.js';

class DocumentationCommand extends Command{
  constructor () {
    super('document', 'Production de la documentation');
  }

  get usage () {
    return '';
  }

  get example () {
    return '';
  }

  get options () {
    return [
      // new CommandOption('versions', 'limite la configuration aux versions listées', 'array', 'v')
    ];
  }

  async handler (argv) {
    const settings = {
      //versions: argv.versions ?? []
    };

    const documentation = new Documentation();
    await documentation.document(settings);
  }
}

export { DocumentationCommand };
