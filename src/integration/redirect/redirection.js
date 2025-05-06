import { HtmlRenderable } from '../../core/html-renderable.js';
import { RedirectionType } from './redirection-type.js'

class Redirection extends HtmlRenderable {
  constructor (data) {
    super(data);
    this._dest = data.dest;
  }

  get dest () {
    return this._dest;
  }

  get meta () {
    return `
        <meta http-equiv="refresh" content="0; url=${this.data.url}">
`;
  }

  get script () {
    return `
        <script>
          const locales = ${JSON.stringify(this.data.locales)};
          const urls = new Map(${JSON.stringify(Object.entries(this.data.urls))});
          const language = navigator.language;
          const code = language.split('-')[0];

          switch (true) {
            case locales.includes(language):
              window.location.pathname = urls.get(language);
              break;

            case locales.includes(code):
              window.location.pathname = urls.get(code);
              break;

            case locales.some(locale => locale.startsWith(code)):
              const locale = locales.find(locale => locale.startsWith(code));
              window.location.pathname = urls.get(locale);
              break;

            default:
              window.location.pathname = '${this.data.url}';
              break;
          }
        </script>
`;
  }

  get redirection () {
    switch (this.data.type) {
      case RedirectionType.META:
        return this.meta;
      case RedirectionType.SCRIPT:
        return this.script;
      default:
        return '';
    }
  }

  async render () {
    return this.format(`
<html lang="${this.data.code}">
    <head>
        <meta charset="UTF-8">
        <title>${this.data.title}</title>
        ${this.redirection}
    </head>
    <body>
        <p>${this.data.text}</p>
    </body>
</html>
`);
  }
}

export { Redirection };
