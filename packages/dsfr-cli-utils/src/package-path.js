import path from 'path';
export const getPackagePath = (pckName) => {
  return path.dirname(path.resolve('node_modules', `${pckName}/package.json`)) + '/';
};
