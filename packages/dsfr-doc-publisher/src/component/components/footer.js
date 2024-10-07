import { Component } from '../component.js';

class Footer extends Component {
  constructor (data) {
    super(data, 'footer');
  }
  get ejsPath () {
    return 'src/component/footer/template/ejs/footer.ejs';
  }

  async format () {
    return {
      top: this.data?.top,
      brand: {
        logo: {
          title: 'République<br>Française',
        },
        link: this.data.link
      },
      content: this.data?.content,
      bottom: this._formatBottom(this.data?.bottom),
    };
  }

  _formatBottom (bottom) {
    if (!bottom) return undefined;
    return {
      ...bottom,
      links: this._formatBottomLinks(bottom?.links)
    }
  }

  _formatBottomLinks (links) {
    if (!links) return undefined;
    return links.map(link => this._formatBottomLink(link));
  }

  _formatBottomLink (link) {
    const classes = link.classes ?? [];
    const attributes = link.attributes ?? {};

    switch (true) {
      case link.action === 'display':
        classes.push('fr-btn--display');
        attributes['data-fr-opened'] = false;
        attributes['aria-controls'] = 'display-modal';
        link.template = 'button';
        break;

      case link.action === 'consent':
        classes.push('fr-btn--tertiary-no-outline');
        attributes['data-fr-opened'] = false;
        attributes['aria-controls'] = 'consent-modal';
        link.template = 'button';
        break;
    }

    link.classes = classes;
    link.attributes = attributes;

    return link;
  }

}

export { Footer };
