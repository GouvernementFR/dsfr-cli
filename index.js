#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ConfigurationCommand } from './src/configure/configuration-command.js';
import { DocumentationCommand } from './src/document/documentation-command.js';

let commands = yargs(hideBin(process.argv))
  .parserConfiguration({
  "parse-numbers": false,
})
  .scriptName('dsfr');

const configuration = new ConfigurationCommand();
commands = configuration.add(commands);

const documentation = new DocumentationCommand();
commands = documentation.add(commands);

commands = commands.help().argv;
