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
      new CommandOption('clean', 'Supprime le dossier public avant compilation pour repartir de zéro', 'boolean'),
      new CommandOption('parts', 'Liste des parties à compiler', 'array', 'p'),
    ];
  }

  async handle () {
    console.log('handle');
    const configuration = new Configuration();
    await configuration.configure();
  }
}

export { ConfigurationCommand };
