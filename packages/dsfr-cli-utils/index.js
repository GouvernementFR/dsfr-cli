import { createDir, createFile, deleteDir, copyDir, copyFile } from './src/file.js';
import { deepFreeze } from './src/freeze.js';
import log from './src/log.js';
import { getPackagePath } from './src/package-path.js';
import { normalize, normalizeId } from './src/normalize.js';
import { TagAttributes } from './src/tag-attributes.js';

export { createDir, createFile, deleteDir, copyDir, copyFile, deepFreeze, log, getPackagePath, normalize, normalizeId, TagAttributes };
