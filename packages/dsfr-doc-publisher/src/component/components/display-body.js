import { Component } from '../component.js';

const getRadioData = (id, label, pictogram, hint) => {
  const radio = {
    type: 'radio',
    inline: false,
    data: {
      id: `fr-radios-theme-${id}`,
      label: label,
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
      legend: 'Choisissez un thème pour personnaliser l’apparence du site.',
      inline: false,
      choice: true,
      elements: [
        getRadioData('light', 'Thème clair', 'sun'),
        getRadioData('dark', 'Thème sombre', 'moon'),
        getRadioData('system', 'Système', 'system', 'Utilise les paramètres système')
      ]
    };
  }
}

export { DisplayBody };
