import { PageNode } from '../page-node.js';

class HtmlContainerNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._tagName = data.tagName;
    this._attributes = data.attributes;
    this._classes = data.classes;
  }

  get tagName () {
    return this._tagName;
  }

  get attributes () {
    return this._attributes;
  }

  get classes () {
    return this._classes;
  }

  get data () {
    return {
      ...super.data,
      tagName: this._tagName,
      attributes: this._attributes,
      classes: this._classes,
    }
  }
}

HtmlContainerNode.TYPE = 'htmlContainer';

export { HtmlContainerNode };
