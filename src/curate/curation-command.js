import { Command, CommandOption } from '../command.js';
import { Curation } from './curation.js';

class CurationCommand extends Command{
  constructor () {
    super('curate', 'Optimise et répartit les assets dans les différentes parties du projet');
  }

  get usage () {
    return ' -s <src>';
  }

  get example () {
    return 'optimise et répartit depuis le dossier src';
  }

  get options () {
    return [
      new CommandOption('src', 'chemin du dossier source', 'string', 's'),
      new CommandOption('keep', 'préserve les fichiers existants', 'boolean', 'k')
    ];
  }

  async handler (argv) {
    const settings = {
      src: argv.src,
      keep: argv.keep === true
    };

    const curation = new Curation();
    await curation.curate(settings);
  }
}

export { CurationCommand };
