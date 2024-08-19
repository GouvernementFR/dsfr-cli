#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ConfigurationCommand } from './src/configure/configuration-command.js';
import { PublicationCommand } from './src/publish/publication-command.js';

let commands = yargs(hideBin(process.argv))
  .parserConfiguration({
  "parse-numbers": false,
})
  .scriptName('dsfr');

const configuration = new ConfigurationCommand();
commands = configuration.add(commands);

const publication = new PublicationCommand();
commands = publication.add(commands);

commands = commands.help().argv;
