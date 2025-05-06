import { CardContainerDirective } from '../components/card/card-container-directive.js';

class PageItemCardContainerDirective extends CardContainerDirective {
  structure (data) {
    data.properties = {
      horizontal: false,
      download: false,
      ...data.properties,
    };

    data.children = [
      {
        type: 'image',
        url: data.cover ?? '/static/img/placeholder.16x9.png',
      },
      {
        type: 'heading',
        depth: 2,
        children: [
          {
            type: 'link',
            url: data.url,
            children: [
              {
                type: 'text',
                value: data.text
              },
            ],
          },
        ],
      }
    ];

    if (data.shortDescription || data.excerpt) {
      data.children.push({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: data.shortDescription || data.excerpt,
          },
        ],
      });
    }

    return super.structure(data);
  }

}

PageItemCardContainerDirective.NAME = 'dsfr-doc-page-item-card';

export { PageItemCardContainerDirective };
