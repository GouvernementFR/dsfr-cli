#!/usr/bin/env node
import path from 'path';
import { execSync } from 'child_process';

const RELEASED_PACKAGES = [
  {
    name: 'dsfr-forge',
    path: './modules/forge'
  },
  {
    name: 'dsfr-alchemist',
    path: './modules/alchemist'
  },
  {
    name: 'dsfr-lore',
    path: './modules/lore'
  },
  {
    name: 'dsfr-roller',
    path: './modules/roller'
  },
  {
    name: 'dsfr-nexus',
    path: './modules/nexus'
  }];

const FILES_TO_COPY = ['LICENSE.md', 'SECURITY.md', 'legal'];

for (const pkg of RELEASED_PACKAGES) {
  console.log(`Releasing package: ${pkg.name}`);
  try {
    FILES_TO_COPY.forEach(file => {
      const dest = path.join(pkg.path, '/');
      execSync(`cp -r ${file} ${dest}`);
    });
  } catch (e) {
    console.error(`Error while copying files to ${pkg.name}:`, e);
  }

  try {
    execSync(`npm publish --workspace @gouvfr/${pkg.name}`, { stdio: 'inherit' });
  }
  catch (e) {
    console.error(`Error while publishing on npm ${pkg.name}:`, e);
  }

  try {
    FILES_TO_COPY.forEach(file => {
      const target = path.join(pkg.path, file);
      execSync(`rm -r ${target}`);
    });
  }
  catch (e) {
    console.error(`Error while removing files from ${pkg.name}:`, e);
  }
}
