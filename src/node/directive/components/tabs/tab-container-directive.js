import { Node } from '../../../node.js';

class TabContainerDirective extends Node {
  structure (data) {
    const tabId = data?.attributes?.id;
    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      attributes: {
        id: `${tabId}-panel`,
        role: 'tabpanel',
        'aria-labelledby': tabId
      },
      classes: ['fr-tabs__panel'],
      children: data.children
    });
  }
}

TabContainerDirective.NAME = 'fr-tab';

export { TabContainerDirective };
