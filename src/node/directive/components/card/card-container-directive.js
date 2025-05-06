import { Node } from '../../../node.js'

class CardContainerDirective extends Node {
  structure (data) {
    this._data = data;
    const horizontal = data.properties.horizontal === true;
    const download = data.properties.download === true;
    const image = Node.getImageChild(data);
    const contentChildren = data.children.filter(child => !Node.getImageChild(child));
    const contentTitle = contentChildren.find(child => child.type === 'heading');
    const contentDescription = contentChildren.find(child => child.type === 'paragraph');
    const hintStart = this.structureHintStart;
    const hintEnd = this.structureHintEnd;

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['fr-card', 'fr-enlarge-link', horizontal ? 'fr-card--horizontal' : '', download ? 'fr-card--download' : ''],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-card__body'],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['fr-card__content'],
              children: [
                {
                  classes: ['fr-card__title'],
                  ...contentTitle,
                },
                {
                  classes: ['fr-card__desc'],
                  ...contentDescription
                },
                hintStart,
                hintEnd
              ]
            }
          ]
        },
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-card__header'],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['fr-card__img'],
              children: [
                {
                  classes: ['fr-responsive-img'],
                  ...image
                }
              ]
            }
          ]
        }
      ]
    });
  }

  get structureHintStart() {
    let structureHintStart = {};
    if (this._data.properties.hintStart) {
      structureHintStart = {
        type: 'htmlContainer',
        tagName: 'div',
        classes: ['fr-card__start'],
        children: [
          {
            type: 'paragraph',
            classes: ['fr-card__detail'],
            children: {
              type: 'text',
              value: this._data.properties.hintStart
            }
          }
        ]
      }
    }
    return structureHintStart;
  }

  get structureHintEnd() {
    let structureHintStart = {};
    if (this._data.properties.hintEnd) {
      structureHintStart = {
        type: 'htmlContainer',
        tagName: 'div',
        classes: ['fr-card__end'],
        children: [
          {
            type: 'paragraph',
            classes: ['fr-card__detail'],
            children: {
              type: 'text',
              value: this._data.properties.hintEnd
            }
          }
        ]
      }
    }
    return structureHintStart;
  }

}

CardContainerDirective.NAME = 'fr-card';

export { CardContainerDirective };
