import { Component } from '../component.js';

const getRadioData = ({id, text, pictogram, hint}) => {
  const radio = {
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

  return radio;
};

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
      elements: this.data.radios.map(radio => getRadioData(radio))
    };
  }
}

export { DisplayBody };
