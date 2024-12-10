import { Node } from '../node.js';
import { HtmlNode } from '../generic/html-node.js';

class TabbedNavigationContainerDirective extends Node {
  constructor (data) {
    super(data);
    const list = this.findDescendantsByType('list')[0];
    list.attributes.setAttribute('role', 'tablist');
    const items = list.findDescendantsByType('listItem');
    for (const item of items) {
      item.attributes.setAttribute('role', 'presentation');
      let node;
      let isSelected = false;
      const link = item.findDescendantsByType('link')[0];
      if (link) {
        node = link;
      } else {
        node = new HtmlNode({ type: 'html', value:'<div>' });
        const close = new HtmlNode({ type: 'html', value:'</div>' });
        item._children = [node, ...item._children, close];
        isSelected = true;
      }
      node.attributes.setAttribute('role', 'tab');
      node.attributes.setAttribute('aria-selected', isSelected);
      node.attributes.addClass('tabbed-navigation__tab');
    }
  }
  async render () {
    this.attributes.addClass('tabbed-navigation');
    return `<nav ${this.renderAttributes()}>${await super.render()}</nav>`;
  }
}

TabbedNavigationContainerDirective.NAME = 'dsfr-doc-tab-navigation';

export { TabbedNavigationContainerDirective };
