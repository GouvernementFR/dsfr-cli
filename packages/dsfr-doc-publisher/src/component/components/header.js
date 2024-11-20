import { Component } from '../component.js';
import { formatLink } from '../../core/format-link.js';

class Header extends Component {
  constructor (data) {
    super(data, 'header');
  }
  get ejsPath () {
    return 'src/dsfr/component/header/template/ejs/header.ejs';
  }

  async format () {
    const links = this.data.links ? this._formatButtons(this.data.links) : undefined;

    const menu = {
      id: 'menu',
      modalId: 'menu-modal',
    }

    const search = {
      id: 'search',
      modalId: 'search-modal',
      input: { placeholder: this.data.search.label, label: this.data.search.label },
      button: { id: 'search-button', label: this.data.search.label, title: this.data.search.title ?? this.data.search.label }
    };

    return {
      body: {
        brand: {
          logo: {
            title: 'République<br>Française'
          },
          service: {
            title: this.data.title
          },
          link: {
            href: this.data.link.url,
            title: this.data.link.title,
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
    };
  }

  _formatButtons (data) {
    return { buttons: data.map(button => this._formatButton(button)) };
  }

  _formatButton (data) {
    const classes = [];
    const attributes = {};

    switch (true) {
      case data.action === 'display':
        classes.push('fr-btn--display');
        attributes['data-fr-opened'] = 'false';
        attributes['aria-controls'] = 'display-modal';
        data.label = data.text;
        break;

      case data.url !== undefined:
        data.markup = 'a';
        data = formatLink(data);
        break;
    }

    if (data.icon) classes.push(`fr-icon-${data.icon}`);
    if (data.modifier) classes.push(`fr-btn--${data.modifier}`);
    data.classes = classes;
    data.attributes = attributes;
    return data;
  }

  _formatNavigation (data) {
    return {
      id: 'navigation',
      links: this.data?.items?.map(item => ({ ...formatLink(item), active: item.isCurrent })).filter(item => item)
    };
  }
}

export { Header };
