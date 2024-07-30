#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ConfigurationCommand } from './src/configure/configuration-command.js';

/**
 * Configurator
 */
const configuration = new ConfigurationCommand();

yargs(hideBin(process.argv)).scriptName('dsfr')
  .command(configuration.name, configuration.description, configuration.builder.bind(configuration), configuration.handle.bind(configuration))
  .help()
  .argv;
