import { Node } from '../../../node.js'
import { log } from '@gouvfr/dsfr-forge';

class GuidelineContainerDirective extends Node {
  structure (data) {
    const image = Node.getImageChild(data);

    if (!image) {
      log.warn('GuidelineContainerDirective: missing image');
      return data;
    }

    const valid = data.properties.valid.toLowerCase() === 'true';
    const col = data.properties.col || '12';
    const description = data.children.filter(child => {
      switch (true) {
        case child?.data?.directiveLabel === true:
          return false;
        case Node.getImageChild(child) !== null:
          return false;
        default:
          return true;
      }
    });
    const title = valid ? data.fragments.do : data.fragments.dont;

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['fr-col-12', `fr-col-md-${col}`],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['dsfr-doc-guideline', `dsfr-doc-guideline--${valid ? 'do' : 'dont'}`],
          children: [
            {
              type: 'image',
              classes: ['dsfr-doc-guideline__img'],
              attributes: {
                src: image.url,
                alt: title
              }
            },
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['dsfr-doc-guideline__content'],
              children: [
                {
                  type: 'paragraph',
                  classes: ['dsfr-doc-guideline__title'],
                  children: [
                    {
                      type: 'text',
                      value: title
                    }
                  ]
                },
              ].concat(description)
            }
          ]
        }
      ]
    });
  }
}

GuidelineContainerDirective.NAME = 'dsfr-doc-guideline';

export { GuidelineContainerDirective };
