import render from '../../../render/render.js';
import path from 'path';

class Header {
  constructor (data) {
    this._data = this._format(data.resource.header);
    this._translateData = this._formatTranslate(data);
    this._versionData = this._formatVersion(data);
  }

  _format (data) {
    const links = data.links ? this._formatButtons(data.links) : undefined;
    const menu = {
      id: 'menu',
      modalId: 'menu-modal',
    }
    const search = {
      id: 'search',
      modalId: 'search-modal',
      input: { placeholder: data.search.label, label:data.search.label },
      button: { id: 'search-button', label: data.search.label, title: data.search.title ?? data.search.label }
    };
    return {
      header: {
        body: {
          brand: {
            logo: {
              title: 'République<br>Française'
            },
            service: {
              title: data.title
            },
            link: {
              ...data.link,
              position: 'service'
            },
            navbar: {
              menu: menu
            }
          },
          tools: {
            links: links,
            search: search
          }
        },
        menu: {
          ...menu,
          tools: {
            ...links,
            duplicateLinks: true
          }
        }
      }
    };
  }

  _formatButtons (data) {
    return { buttons: data.map(button => this._formatButton(button)) };
  }

  _formatButton (data) {
    const classes = [];
    if (data.href !== undefined) {
      data.markup = 'a';
    }

    if (data.icon) classes.push(`fr-icon-${data.icon}`);
    if (data.modifier) classes.push(`fr-btn--${data.modifier}`);
    data.classes = classes;
    return data;
  }

  _formatTranslate (data) {
    if (!data.alts) return undefined;
    const languages = data.alts.map(alt => {
      const lang = alt.lang;
      return {
        name: data.fragments.translate[lang],
        href: alt.url,
        locale: lang
      };
    });
    languages.unshift({ name: data.fragments.translate[data.lang], href: '', locale: data.lang, active: true });

    const translate = {
      id: 'translate',
      button: { title: data.fragments.translate.title, kind: 3 },
      collapseId: 'translate-collapse',
      languages: languages
    };
    return { translate: translate };
  }

  _formatVersion (data) {
    const version = {
      id: 'version',
      button: { title: data.fragments.translate.title, kind: 3 },
      collapseId: 'version-collapse',
      versions: [ ...data.versions, { label: 'v1.14', url: '#' }, { label: 'v1.13', url: '#' } ]
    };
    return { version: version };
  }

  async render () {
    let toolsContent = '';
    let menuContent = '';

    if (this._versionData) {
      this._versionData.version.collapseId = 'version-collapse';
      const versionPath = 'src/components/version/version.ejs';
      toolsContent += await render(versionPath, this._versionData, 'publisher');
      this._versionData.version.collapseId = 'version-collapse-menu';
      menuContent += await render(versionPath, this._versionData, 'publisher');
    }

    if (this._translateData) {
      this._translateData.translate.collapseId = 'translate-collapse';
      const translatePath = 'src/component/translate/template/ejs/translate.ejs';
      toolsContent += await render(translatePath, this._translateData)

      this._translateData.translate.collapseId = 'translate-collapse-menu';
      menuContent += await render(translatePath, this._translateData);
      this._data.header.menu.tools.toolsContent = menuContent;
    }

    if (toolsContent) this._data.header.body.tools.toolsContent = toolsContent;
    if (menuContent) this._data.header.menu.tools.toolsContent = menuContent;

    this._html = await render('src/component/header/template/ejs/header.ejs', this._data);
  }

  get html () {
    return this._html;
  }


}

export { Header };
