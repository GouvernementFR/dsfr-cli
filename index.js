#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ConfigurationCommand } from './src/configure/configuration-command.js';

/**
 * Configurator
 */
const configuration = new ConfigurationCommand();

const commands = yargs(hideBin(process.argv))
commands.scriptName('dsfr')
  .command(configuration.name, configuration.description, configuration.builder.bind(configuration), configuration.handle.bind(configuration))
  .help()
  .argv;
