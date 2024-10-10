import { Component } from '../component.js';

class Action extends Component {
  constructor (data) {
    super(data, 'action');
  }

  get ejsPath () {
    return 'src/core/template/ejs/action/action.ejs';
  }

  async format () {
    return {
      kind: this.data.kind || 'button',
      label: this.data.label,
      id: this.data.id,
      href: this.data.url ?? this.data.href,
      type: this.data.type,
      blank: this.data.blank,
      self: this.data.self,
      disabled: this.data.disabled,
      classes: this.data.classes,
      attributes: this.data.attributes,
    }
  }
}

export { Action };
