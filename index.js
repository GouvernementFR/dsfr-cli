#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ConfigurationCommand } from './src/configure/configuration-command.js';

console.log('DSFR-CLI');

let commands = yargs(hideBin(process.argv)).scriptName('dsfr');

const configuration = new ConfigurationCommand();
commands = configuration.add(commands);

commands = commands.help().argv;
