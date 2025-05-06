import { Command, CommandOption } from '../command.js';
import { Exposition } from './exposition.js';

class ExpositionCommand extends Command{
  constructor () {
    super('expose', 'Mise en place d\'un serveur permettant de visualiser les pages de la documentation');
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

    const exposition = new Exposition();
    await exposition.expose(settings);
  }
}

export { ExpositionCommand };
