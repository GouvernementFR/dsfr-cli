#!/usr/bin/env node

import { execSync } from 'child_process';
import { log } from '@gouvfr/dsfr-forge'

const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

log.info(`branch name: ${branchName}`);

try {
  execSync('git remote get-url cli-remote');
}
catch (e) {
  execSync('git remote add cli-remote git@github.com:GouvernementFR/dsfr-cli.git');
}

const folders = ['dsfr', 'modules', 'frameworks', 'releases', 'legal'];
const files = ['yarn.lock', 'package.json'];

const packages = [
  {
    name: 'nexus',
    path: 'modules/nexus'
  },
  {
    name: 'forge',
    path: 'modules/forge'
  },
  {
    name: 'roller',
    path: 'modules/roller'
  },
  {
    name: 'lore',
    path: 'modules/lore'
  },
  {
    name: 'alchemist',
    path: 'modules/alchemist'
  }
];

packages.forEach(({name, path}) => {
  try {
    execSync(`rm -r ${path}/node_modules `);
  }
  catch (e) {
    log.error(`node_modules not found in ${name}`);
  }
});

const branches = packages.map(({name, path}) => ({ branch: `${branchName}@${name}`, path }));

/**
 * remove
 */

branches.forEach(({ branch, path }) => {
  execSync(`if git show-ref --quiet refs/heads/${branch}; then git branch -D ${branch}; fi`, { stdio: 'inherit' });
});

/**
 * package
 */

branches.forEach(({ branch, path }) => {
  execSync(`git rm -r --ignore-unmatch ${folders.join(' ')} ${files.join(' ')}`, { stdio: 'inherit' });
  execSync(`git checkout --orphan ${branch}`, { stdio: 'inherit' });
  execSync(`git checkout ${branchName} ${path}/*`, { stdio: 'inherit' });
  execSync(`git mv -f ${path}/* .`, { stdio: 'inherit' });
  execSync(`git add .`, { stdio: 'inherit' });
  execSync(`git commit -m "chore: create package branch"`, { stdio: 'inherit' });
  execSync(`git push -f cli-remote ${branch}`, { stdio: 'inherit' });
  execSync(`git checkout -f ${branchName}`, { stdio: 'inherit' });
});
