import path from 'path';
import * as url from 'node:url'
export const getPackagePath = (pckName) => {
  const pckPath = url.fileURLToPath(import.meta.resolve(`${pckName}/package.json`));
  return `${path.dirname(pckPath)}/`;
};
