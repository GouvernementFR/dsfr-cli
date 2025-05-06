import { Command, CommandOption } from '../command.js';
import { Configuration } from './configuration.js';

class ConfigurationCommand extends Command{
  constructor () {
    super('configure', 'Analyse les fichiers du dsfr pour générer la configuration');
  }

  get usage () {
    return ' -p <part> <part>';
  }

  get example () {
    return 'génère la configuration pour les parties spécifiées';
  }

  get options () {
    return [
      new CommandOption('bypass', 'évite les actions répétées', 'boolean', 'b'),
      new CommandOption('versions', 'limite la configuration aux versions listées', 'array', 'v')
    ];
  }

  async handler (argv) {
    const settings = {
      bypass: argv.bypass === true,
      versions: argv.versions ?? []
    };

    const configuration = new Configuration();
    await configuration.configure(settings);
  }
}

export { ConfigurationCommand };
