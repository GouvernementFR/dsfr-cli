import { Commit } from './commit.js';

const TAG_PATTERN = 'v(?<major>\\d+)\\.(?<minor>\\d+)\\.(?<patch>\\d+)(?:-(?<build>.+))?';
const TAG_REGEX = new RegExp(`^${TAG_PATTERN}$`);

const DATE_OPTIONS = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

class Release {


  constructor (data) {
    this._data = data;
    const { groups } = data.id.match(TAG_REGEX);
    this._major = parseInt(groups.major);
    this._minor = parseInt(groups.minor);
    this._patch = parseInt(groups.patch);
    this._build = groups.build;

    const formater = new Intl.DateTimeFormat("fr-FR", DATE_OPTIONS);
    this._date = formater.format(new Date(data.date));

    this._commits = data.commits.map(commitData => new Commit(commitData));
  }

  get major () {
    return this._major;
  }

  get minor () {
    return this._minor;
  }

  get patch () {
    return this._patch;
  }

  get build () {
    return this._build;
  }

  render () {
    return `### [${this._data.id}](${this._data.url}) - ${this._date}

${this._commits.map(commit => commit.render()).join('')}
`;
  }
}

export { Release };
