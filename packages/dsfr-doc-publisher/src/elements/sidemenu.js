class Sidemenu {
  constructor (data) {
    this._data = data;
    this._html = '';
  }

  async render () {
    if (this._data === undefined) return;

    this._html += '<div class="fr-col-12 fr-col-md-4">\n';

    this._html += '</div>\n';
  }

  get html () {
    return this._html;
  }
}

export { Sidemenu };
