import { Component } from '../component.js';
import { formatLink } from '../../core/format-link.js';

class Sidemenu extends Component {
  constructor (data) {
    super(data, 'sidemenu');
  }
  get ejsPath () {
    return 'src/dsfr/component/sidemenu/template/ejs/sidemenu.ejs';
  }

  async format () {
    const format =  {
      id: 'sidemenu',
      collapseId: this.uniqueId(),
      titleId: this.uniqueId(),
      title: this.data.title,
      items: this.data?.items?.map(item => this._formatItem(item)).filter(item => item)
    };

    return format;
  }

  _formatItem (item) {
    switch (item.type) {
      case 'menu':
        return this._formatMenu(item);

      default:
        return this._formatLink(item);
    }
  }

  _formatLink (link) {
    return {
      ...formatLink(link),
      active: link.isCurrent,
      type: 'link'
    };
  }

  _formatMenu (menu) {
    return {
      id: menu.id,
      collapseId: this.uniqueId(),
      type: 'menu',
      label: menu.label ?? menu.text,
      href: menu.url,
      active: menu.isCurrent,
      items: menu.items.map(item => this._formatItem(item))
    }
  }

  async render () {
    return await super.render();
  }
}

export { Sidemenu };
