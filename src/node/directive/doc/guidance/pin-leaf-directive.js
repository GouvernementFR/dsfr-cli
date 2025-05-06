import { Node } from '../../../node.js';

class PinLeafDirective extends Node {
  structure (data) {
    const required = data?.attributes?.required;
    const add = data?.attributes?.add;
    const titleChildren = data?.children[0];
    const requiredFragment = data.fragments?.anatomy?.required;
    const optionalFragment = data.fragments?.anatomy?.optional;
    let descriptionValue = `${required === 'true' ? requiredFragment : optionalFragment}`;
    if (add) descriptionValue += ` ${add}`;

    if (!titleChildren) {
      log.warn(`PinLeafDirective: missing label on pin`);
    }

    return {
      type: 'htmlContainer',
      tagName: 'li',
      classes: ['dsfr-doc-anatomy__pin', required === 'true' ? 'dsfr-doc-anatomy__pin--required' : ''],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'span',
          classes: ['dsfr-doc-anatomy__title'],
          children: [titleChildren]
        },
        {
          type: 'htmlContainer',
          tagName: 'span',
          classes: ['dsfr-doc-anatomy__description'],
          children: [
            {
              type: 'text',
              value: descriptionValue
            }
          ]
        }
      ]
    };
  }
}

PinLeafDirective.NAME = 'dsfr-doc-pin';

export { PinLeafDirective };
