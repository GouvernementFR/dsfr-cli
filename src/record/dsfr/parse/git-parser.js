import { createFile, Git } from '@gouvfr/dsfr-forge';
import yaml from 'yaml'

const filter = (commit) => {
  switch (true) {
    case commit.type === 'chore' && /changelog|incrémentation|incémentation/.test(commit.title):
      return false;
  }

  return true
};

class GitParser {
  constructor (version, major) {
    this._version =`v${version}`;
    this._major = major;
  }

  get data () {
    return this._data;
  }

  async read () {
    this._git = new Git();
    await this._git.load();

    // if (!git?.provider?.url?.endsWith('/dsfr')) return;

    await this._git.loadTags();
    await this._git.loadCommits();

    this._tags = this._git.tags
      .filter(tag => tag.id.startsWith(`v${this._major}`))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this._tags.unshift({
        id: this._version,
        date: new Date().toISOString().split('T')[0]
      });

    this._commits = this._git.commits
      .filter(filter)
      .map(commit => ({ ...commit, tag: commit.tag === 'HEAD' ? this._version : commit.tag }))
      .filter(commit => commit.tag?.startsWith(`v${this._major}`));
  }

  async write () {
    if (!this._commits) return;

    this._data = this._tags.map(tag => ({
      ...tag,
      url: this._git.provider.release(tag.id),
      commits: this._commits
        .filter(commit => commit.tag === tag.id)
    }));



    createFile('./changelog.yml', yaml.stringify(this._data));
  }
}

export { GitParser };
