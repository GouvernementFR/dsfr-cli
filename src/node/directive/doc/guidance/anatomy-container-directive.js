import { Node } from '../../../node.js'
import { log } from '@gouvfr/dsfr-forge';

class AnatomyContainerDirective extends Node {
  structure (data) {
    const image = Node.getImageChild(data);
    const col = data.properties?.col ?? 12;

    if (!image) {
      log.warn('GuidelineContainerDirective: missing image');
      return data;
    }

    const contentChildren = data.children.filter(child => !Node.getImageChild(child));

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['fr-grid-row', 'fr-grid-row--gutters'],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-col-12', `fr-col-sm-${col}`],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['dsfr-doc-anatomy'],
              children: [
                {
                  type: 'htmlContainer',
                  tagName: 'div',
                  classes: ['dsfr-doc-anatomy__image'],
                  children: [
                    {
                      ...image,
                      classes: ['fr-responsive-img']
                    }
                  ]
                },
                {
                  type: 'htmlContainer',
                  tagName: 'ol',
                  classes: ['dsfr-doc-anatomy__content'],
                  children: contentChildren
                }
              ]
            }
          ]
        }
      ]
    });

  }

}

AnatomyContainerDirective.NAME = 'dsfr-doc-anatomy';

export { AnatomyContainerDirective };
