import { Component } from '../component.js';

class Sidemenu extends Component {
  constructor (data) {
    super(data, 'sidemenu');
  }
  get ejsPath () {
    return 'src/component/sidemenu/template/ejs/sidemenu.ejs';
  }

  async render () {
    this._html += '<div class="fr-col-12 fr-col-md-4">\n';

    await super.render();

    this._html += '</div>\n';
  }
}

export { Sidemenu };
