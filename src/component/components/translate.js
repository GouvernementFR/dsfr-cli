import { Component } from '../component.js';

class Translate extends Component {
  constructor (data) {
    super(data, 'translate');
  }
  get ejsPath () {
    return 'src/dsfr/component/translate/template/ejs/translate.ejs';
  }

  async format () {
    return {
      id: 'translate',
      button: { title: this.data.button, kind: 3 },
      collapseId: 'translate-collapse',
      languages: this._formatLanguages(this.data.languages)
    };
  }

  _formatLanguages (languages) {
    return languages.map(lang => this._formatLanguage(lang));
  }

  _formatLanguage (lang) {
    return {
      ...lang,
      href: lang.url
    };
  }
}

export { Translate };
