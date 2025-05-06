import { Node } from '../../../node.js'
import { log } from '@gouvfr/dsfr-forge';

class AccordionContainerDirective extends Node {
  structure (data) {
    if (!data.properties.id) {
      log.warn('AccordionContainerDirective: missing "accordion id"');
      return data;
    }

    const accordionId = data.properties.id;
    const titleChildren = data.children.filter(child => child?.data?.directiveLabel)?.[0]?.children;
    const contentChildren = data.children.filter(child => !child?.data?.directiveLabel);
    const titleType = titleChildren[0].value.startsWith('#') ? 'heading' : 'paragraph';
    const titleDepth = /^(#+)/.exec(titleChildren[0].value)?.[1]?.length;
    if (titleType === 'heading') {
      titleChildren[0].value = titleChildren[0].value.replace(/^(#+)\s*/, '');
    }

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['fr-accordion'],
      children: [
        {
          type: titleType,
          depth: titleDepth,
          classes: ['fr-accordion__title'],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'button',
              classes: ['fr-accordion__btn'],
              attributes: {
                type: 'button',
                'aria-expanded': data.properties['aria-expanded'] || false,
                'aria-controls': accordionId
              },
              children: titleChildren
            }
          ]
        },
        {
          type: 'htmlContainer',
          tagName: 'div',
          attributes: {
            id: accordionId
          },
          classes: ['fr-collapse'],
          children: contentChildren
        }
      ]
    });
  }
}

AccordionContainerDirective.NAME = 'fr-accordion';

export { AccordionContainerDirective };
