import { Component } from '../component.js';

class Translate extends Component {
  constructor (data) {
    super(data, 'translate');
  }
  get ejsPath () {
    return 'src/component/translate/template/ejs/translate.ejs';
  }

  async format () {
    return {
      id: 'translate',
      button: { title: this.data.button, kind: 3 },
      collapseId: 'translate-collapse',
      languages: this.data.languages
    };
  }
}

export { Translate };
