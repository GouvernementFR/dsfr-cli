import { Component } from '../component.js';
import { formatLink } from '../../core/format-link.js';
class Navigation extends Component {
  constructor (data) {
    super(data, 'navigation');
  }
  get ejsPath () {
    return 'src/component/navigation/template/ejs/navigation.ejs';
  }

  async format () {
    return {
      id: 'navigation',
      items: this.data?.items?.map(item => this._formatItem(item)).filter(item => item)
    };
  }

  _formatItem (item) {
    switch (item.type) {
      case 'link':
        return this._formatLink(item)

      case 'menu':
        return this._formatMenu(item);

      case 'mega-menu':
        return this._formatMegaMenu(item);
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
      active: menu.isCurrent,
      items: menu.items.map(link => this._formatLink(link))
    }
  }

  _formatMegaMenu (megaMenu) {
    return {
      id: megaMenu.id,
      collapseId: this.uniqueId(),
      type: 'mega-menu',
      label: megaMenu.label ?? megaMenu.text,
      href: megaMenu.url,
      active: megaMenu.isCurrent,
      categories: megaMenu.categories.map(category => this._formatCategory(category))
    };
  }

  _formatCategory (category) {
    return {
      id: category.id,
      ...formatLink(category),
      active: category.isCurrent,
      items: category.items.map(link => this._formatLink(link))
    }
  }
}

export { Navigation };
