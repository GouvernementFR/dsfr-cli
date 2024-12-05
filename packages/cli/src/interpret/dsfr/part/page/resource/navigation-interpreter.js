import { log, normalizeId } from '@gouvfr/dsfr-cli-utils';

class NavigationInterpreter {
  constructor (state, data) {
    this._state = state;
    this._data = data;
  }

  async resolve () {
    this._interpretMain();
    this._interpretSidemenu();
  }

  _interpretMain (main) {
    this._data.main.items = this._data.main.items.map(item => this._mapMainItem(item)).filter(item => item);
  }

  _mapMainItem (item) {
    switch (item.type) {
      case 'link':
        return {
          ...this._state.resolveItem(item),
          type: 'link'
        };

      case 'menu':
        return this._interpretMenu(item);

      case 'mega-menu':
        return this._interpretMegaMenu(item);
    }
  }

  _interpretMenu (menu) {
    const node = this._state.resolveItem(menu);

    return {
      type: 'menu',
      id: normalizeId(menu.path),
      text: node.text,
      url: node.url,
      isCurrent: node.isCurrent,
      items: this._interpretItems(menu)
    };
  }

  _interpretMegaMenu (item) {
    const node = this._state.resolveItem(item);
    const categories = item.categories ? item.categories.map(category => this._interpretCategory(category)) : this._resolveCategories(item.path);

    return {
      type: 'mega-menu',
      id: normalizeId(item.path),
      text: node.text,
      url: node.url,
      isCurrent: node.isCurrent,
      categories: categories
    };
  }

  _resolveCategories (path) {
    return this._state.resolveItems(path).map(category => this._interpretCategory(category));
  }

  _interpretCategory (category) {
    const node = this._state.resolveItem(category);

    return {
      id: normalizeId(category.path),
      text: node.text,
      url: node.url,
      isCurrent: node.isCurrent,
      items: this._interpretItems(category)
    };
  }

  _interpretItems (wrapper) {
    if (wrapper.items) {
      const items = wrapper.items.map(item => this._state.resolveItem(item));
      if (items && items.length) return items;
    }

    const items = this._state.resolveItems(wrapper.path, wrapper.kind);
    if (items && items.length) return items;
  }

  _interpretSidemenu () {
    const sidemenu = this._getMatch();
    if (!sidemenu) {
      this._data.sidemenu = undefined;
      return;
    }

    const node = this._state.resolveItem({path: sidemenu.match});

    this._data.sidemenu = {
      text: node.text,
      items: this._state.resolveItems(sidemenu.match, sidemenu.kind)
    };
  }

  _getMatch () {
    for (const sidemenu of this._data.sidemenu) {
      if (this._state.path.indexOf(sidemenu.match) === 0) {
        return sidemenu;
      }
    }

    return null;
  }
}

export { NavigationInterpreter };
