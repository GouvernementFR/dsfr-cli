import { spawnSync } from 'child_process';
import { log } from './log.js'

export const cmd = async (string) => {
  const [cmd, ...args] = string.trim().split(' ');
  const process = spawnSync(cmd, args, { encoding: 'utf8' });
  if (process.error) {
    log.error(`Error while running command ${string}: ${process.error}`);
  }
  return process.stdout;
};
