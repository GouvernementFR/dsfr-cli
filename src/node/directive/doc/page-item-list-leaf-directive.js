import { Node } from '../../node.js';

class PageItemListLeafDirective extends Node {
  structure (data) {
    const children = data.items.map((item) => ({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['fr-col-12', 'fr-col-sm-6', 'fr-col-lg-4'],
      children: [
        {
          ...item,
          type: 'containerDirective',
          name: data.itemDirectiveName ?? 'dsfr-doc-page-item-card'
        }
      ]
    }));

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: [
        'fr-grid-row',
        'fr-grid-row--gutters',
        'fr-mb-12v',
      ],
      children: children,
    });
  }
}

PageItemListLeafDirective.NAME = 'dsfr-doc-page-item-list';

export { PageItemListLeafDirective };
