#!/usr/bin/env node
import fs from 'fs';

const [,, ...args] = process.argv;

const range = args.includes('--minor') ? 'minor' : args.includes('--major') ? 'major' : 'patch';

const root = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

let version = root.version.split('.');

switch (range) {
  case 'major':
    version[0] = parseInt(version[0]) + 1;
    version[1] = 0;
    version[2] = 0;
    break;
  case 'minor':
    version[1] = parseInt(version[1]) + 1;
    version[2] = 0;
    break;
  default:
    version[2] = parseInt(version[2]) + 1;
}

root.version = version.join('.');
fs.writeFileSync('package.json', JSON.stringify(root, null, 2));

class Package {
  constructor (path) {
    this._path = path;
    this._package = JSON.parse(fs.readFileSync(path, 'utf-8'));
    this._name = this._package.name;
  }

  get name () {
    return this._name;
  }

  level (version, names) {
    this._package.version = version;
    console.log(`${this._name}\nv${version}`);

    for (const name of names) {
      if (this._package?.dependencies?.[name]) this._package.dependencies[name] = `^${version}`;
      if (this._package?.devDependencies?.[name]) this._package.devDependencies[name] = `^${version}`;
    }
    fs.writeFileSync(this._path, JSON.stringify(this._package, null, 2));
  }
}

const packages = fs.readdirSync('packages').map(name => `packages/${name}/package.json`).filter(path => fs.existsSync(path)).map(path => new Package(path));
const names = packages.map(pkg => pkg.name);
packages.forEach(pkg => pkg.level(root.version, names));
