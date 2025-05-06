import { Component } from '../component.js';
import yaml from 'yaml';

class Button extends Component {
  constructor (data) {
    super(data, 'button');
  }

  get ejsPath () {
    return 'src/dsfr/component/button/template/ejs/button.ejs';
  }

  async format () {
    const index = [, , 'secondary', 'tertiary', 'tertiary-no-outline'].indexOf(this.data.kind);
    const url = this.data.url ?? this.data.href;
    const blank = this.data.blank === 'true' || /^(http|www)/.test(url);
    return {
      markup: url ? 'a' : this.data.markup,
      kind: index > -1 ? index : parseInt(this.data.kind),
      size: this.data.size,
      label: this.data.label ?? this.data.text,
      title: this.data.title,
      id: this.data.id,
      href: url,
      type: this.data.type,
      blank,
      self: !blank || this.data.self === 'true',
      disabled: this.data.disabled === 'true',
      classes: typeof this.data.classes === 'string' ? this.data.classes.split(',') : this.data.classes,
      attributes: typeof this.data.attributes === 'string' ? yaml.parse(this.data.attributes) : this.data.attributes,
      icon: this.data.icon,
      iconPlace: this.data['icon-place'],
    }
  }
}

export { Button };
