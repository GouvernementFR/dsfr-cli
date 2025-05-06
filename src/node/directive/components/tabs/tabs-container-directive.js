import { Node } from '../../../node.js';
import { log } from '@gouvfr/dsfr-forge';
import { TabContainerDirective } from './tab-container-directive.js';

class TabsContainerDirective extends Node {
  structure (data) {
    const label = data.children.filter(child => child?.data?.directiveLabel)?.[0]?.children?.[0]?.value;
    const contentChildren = data.children.filter(child => !child?.data?.directiveLabel);
    const tabs = contentChildren
      .filter(child => child.type === 'containerDirective' && child.name === TabContainerDirective.NAME)
      .map(this.structureTab);

    const listAttributes = {
      role: 'tablist'
    };
    if (label) {
      listAttributes['aria-label'] = label;
    }
    else log.warn('TabsContainerDirective: missing label on fr-tabs');

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['fr-tabs'],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'ul',
          classes: ['fr-tabs__list'],
          attributes: listAttributes,
          children: tabs
        },
        ...contentChildren
      ]
    });
  }

  structureTab (data, index) {
    const tabId = data?.attributes?.id;
    const tabTitleChildren = data.children.filter(child => child?.data?.directiveLabel)?.[0]?.children;

    if (!tabTitleChildren) {
      log.warn(`TabsContainerDirective: missing label on fr-tab ${index + 1}`);
    }

    return {
      type: 'htmlContainer',
      tagName: 'li',
      attributes: {
        role: 'presentation'
      },
      children: [
        {
          type: 'htmlContainer',
          tagName: 'button',
          classes: ['fr-tabs__tab'],
          attributes: {
            role: 'tab',
            'aria-controls': `${tabId}-panel`,
            'aria-selected': index === 0
          },
          children: tabTitleChildren
        }
      ]
    };
  }
}

TabsContainerDirective.NAME = 'fr-tabs';

export { TabsContainerDirective };
