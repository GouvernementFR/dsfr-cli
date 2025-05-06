class Github {
  constructor (owner, repository) {
    this._owner = owner;
    this._repository = repository;
    this._url = `https://github.com/${owner}/${repository}`;
  }

  get owner () {
    return this._owner;
  }

  get repository () {
    return this._repository;
  }

  get url () {
    return this._url;
  }

  compare (from, to) {
    return `${this._url}/compare/${from}...${to}`;
  }

  pull (id) {
    return `${this._url}/pull/${id}`;
  }

  issue (id) {
    return `${this._url}/issues/${id}`;
  }

  release (id) {
    return `${this._url}/releases/tag/${id}`;
  }
}

export { Github };
