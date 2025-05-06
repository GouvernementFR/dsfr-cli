import * as fs from 'fs';
import * as path from 'path';
import { log } from './log.js';

// Create Directories
const createDir = (dirPath) => {
  if (dirPath !== '') fs.mkdirSync(dirPath, { recursive: true }, (error) => {
    if (error) log.error(error);
  });
};

// Create Files Parent
const createFileParent = (filePath) => {
  const pathParse = path.parse(filePath);
  const parent = pathParse.dir;
  if (!fs.existsSync(parent)) createDir(parent);
};

// Create Files
const createFile = (filePath, fileContent, muted) => {
  createFileParent(filePath);
  fs.writeFileSync(filePath, fileContent);
  if (!muted) {
    log(38, `create '${filePath}'`);
  }
  return fs.statSync(filePath).size;
};

const deleteDir = (dirPath, msg) => {
  if (!fs.existsSync(dirPath)) {
    log.error(`delete directory '${dirPath}' not found`);
    return;
  }
  if (fs.lstatSync(dirPath).isFile()) {
    log.warn(`'${dirPath}' is a file while a directory is expected by deleteDir`);
    deleteFile(dirPath, msg);
    return;
  }
  log(31, `${msg || 'delete directory'} '${dirPath}'`);
  fs.rmSync(dirPath, { recursive: true });
};

const deleteFile = (filePath, msg) => {
  if (!fs.existsSync(filePath)) {
    log.error(`delete file '${filePath}' not found`);
    return;
  }
  if (fs.lstatSync(filePath).isDirectory()) {
    log.warn(`'${filePath}' is a directory while a file is expected by deleteFile`);
    deleteDir(filePath, msg);
    return;
  }
  log(31, `${msg || 'delete file'} '${filePath}'`);
  fs.rmSync(filePath);
  // fs.unlinkSync(filePath);
};

const copyFile = (srcFile, destFile, force, removeOrphans) => {
  if (!fs.existsSync(srcFile)) {
    if (removeOrphans && fs.existsSync(destFile)) deleteFile(destFile, 'delete orphan');
    return;
  }
  createFileParent(destFile);
  if (!force && fs.existsSync(destFile)) {
    const lss = fs.lstatSync(srcFile);
    const lsd = fs.lstatSync(destFile);
    if (lss.size === lsd.size && lss.mtimeMs <= lsd.mtimeMs && lss.ctimeMs <= lsd.ctimeMs) return;
  }
  log(90, `copy ${srcFile}`);
  fs.copyFileSync(srcFile, destFile);
};

const copyDir = (srcPath, destPath, ext, removeOrphans) => {
  if (!fs.existsSync(srcPath)) return;
  const chunks = fs.readdirSync(srcPath);
  for (const c of chunks) {
    const s = path.join(srcPath, c);
    const d = path.join(destPath, c);
    const ls = fs.lstatSync(s);
    if (ls.isDirectory()) {
      copyDir(s, d, ext, removeOrphans);
    } else {
      if (ext) {
        const index = d.lastIndexOf('.');
        const fileExt = d.substring(index + 1);
        if (ext.indexOf(fileExt) === -1) continue;
      }
      copyFile(s, d);
    }
  }

  if (removeOrphans) {
    const chunks = fs.readdirSync(destPath);

    for (const c of chunks) {
      const s = path.join(srcPath, c);
      if (!fs.existsSync(s)) {
        const d = path.join(destPath, c);
        const ls = fs.lstatSync(d);
        if (ls.isDirectory()) deleteDir(d, 'delete orphan');
        else deleteFile(d, 'delete orphan');
      }
    }
  }
};

export {
  createDir,
  createFile,
  deleteDir,
  deleteFile,
  copyDir,
  copyFile
};
