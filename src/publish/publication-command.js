import { Command, CommandOption } from '../command.js';
import { Publication } from './publication.js';

class PublicationCommand extends Command{
  constructor () {
    super('publish', 'Publication de la documentation');
  }

  get usage () {
    return '';
  }

  get example () {
    return '';
  }

  get options () {
    return [
      new CommandOption('parts', 'limite la publication aux parties listées', 'array', 'p'),
      new CommandOption('bypass', 'évite les actions répétées', 'boolean', 'b'),
      // new CommandOption('versions', 'limite la configuration aux versions listées', 'array', 'v')
    ];
  }

  async handler (argv) {
    const settings = {
      partIds: argv.parts ?? null,
      bypass: argv.bypass === true,
      //versions: argv.versions ?? []
    };

    const publication = new Publication();
    await publication.publish(settings);
  }
}

export { PublicationCommand };
