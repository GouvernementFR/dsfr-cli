class Title {
  constructor (title) {
    this._html = `<title>${title}</title>`;
  }

  get html () {
    return this._html;
  }
}

export { Title };
