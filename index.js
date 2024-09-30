#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ConfigurationCommand } from './src/configure/configuration-command.js';
import { InterpretationCommand } from './src/interpret/interpretation-command.js';
import { PublicationCommand } from './src/publish/publication-command.js';

let commands = yargs(hideBin(process.argv))
  .parserConfiguration({
  "parse-numbers": false,
})
  .scriptName('dsfr');

yargs.command('test', 'Test command', (yargs) => {

}, (argv) => {console.log('test');});

const configuration = new ConfigurationCommand();
commands = configuration.add(commands);

const interpretation = new InterpretationCommand();
commands = interpretation.add(commands);

const publication = new PublicationCommand();
commands = publication.add(commands);

commands = commands.help().argv;
