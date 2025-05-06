import { Node } from '../../../node.js';
import { Button } from '../../../../component/components/button.js';

class ButtonLeafDirective extends Node {
  constructor (data) {
    super(data);
    this.button = new Button(this.data.properties);
  }

  structure (data) {
    if (!data.children.some(child => child.type === 'link')) {
      return super.structure(data);
    }

    const link = data.children.find(child => child.type === 'link');
    const children = data.children.slice();
    children.splice(data.children.indexOf(link), 1, ...link.children);

    return super.structure({
      ...data,
      attributes: {
        ...data.attributes,
        url: link.url
      },
      children: children
    });
  }

  async render () {
    const data = { label: await this.renderChildren() };
    return this.button.render(data);
  }
}

ButtonLeafDirective.NAME = 'fr-button';

export { ButtonLeafDirective };
