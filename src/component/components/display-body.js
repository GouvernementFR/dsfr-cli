import { Component } from '../component.js';

class DisplayBody extends Component {
  constructor (data) {
    super(data, 'fieldset');
  }
  get ejsPath () {
    return 'src/dsfr/component/form/template/ejs/fieldset/fieldset.ejs';
  }

  async format () {
    return {
      id: 'display-fieldset',
      legend: this.data.legend,
      inline: false,
      choice: true,
      elements: this.data.radios.map(radio => this.formatRadio(radio))
    };
  }

  formatRadio ({id, text, pictogram, hint}) {
    return {
      type: 'radio',
      inline: false,
      data: {
        id: `fr-radios-theme-${id}`,
        label: text,
        value: id,
        size: 'md',
        name: 'fr-radios-theme',
        rich: true,
        hint: hint,
        pictogram: {
          name: pictogram
        }
      }
    };
  }
}

export { DisplayBody };
