import { Command, CommandOption } from '../command.js';
import { Recordation } from './recordation.js';

class RecordationCommand extends Command{
  constructor () {
    super('record', 'Récupération des changements sur le dépôt github du DSFR et production du fichier de changelog');
  }

  get usage () {
    return '';
  }

  get example () {
    return '';
  }

  get options () {
    return [];
  }

  async handler (argv) {
    const settings = {};

    const recordation = new Recordation();
    await recordation.record(settings);
  }
}

export { RecordationCommand };
