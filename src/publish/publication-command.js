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
      // new CommandOption('versions', 'limite la configuration aux versions listées', 'array', 'v')
    ];
  }

  async handler (argv) {
    const settings = {
      //versions: argv.versions ?? []
    };

    const publication = new Publication();
    await publication.publish(settings);
  }
}

export { PublicationCommand };
