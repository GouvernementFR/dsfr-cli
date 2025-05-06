class Minor {
  constructor (id, feature) {
    this._id = id;
    this._feature = feature;
    this._patches = [];
  }

  get id () {
    return this._id;
  }

  add (patch) {
    this._patches.push(patch);
  }

  render () {
    return `## v${this._feature}

${this._patches.map(patch => patch.render()).join('')}
`;
  }
}

export { Minor }
