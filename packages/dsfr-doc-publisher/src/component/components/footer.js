import { Component } from '../component.js';
import { formatLink } from '../../core/format-link.js';

class Footer extends Component {
  constructor (data) {
    super(data, 'footer');
  }
  get ejsPath () {
    return 'src/component/footer/template/ejs/footer.ejs';
  }

  async format () {
    return  {
      top: this._formatTop(this.data?.top),
      brand: {
        logo: {
          title: 'République<br>Française',
        },
        link: formatLink(this.data?.link),
      },
      content: {
        ...this.data.content,
        links: this.data?.content?.links?.map(link => formatLink(link))
      },
      bottom: this._formatBottom(this.data?.bottom),
    };
  }

  _formatTop (top) {
    if (!top) return undefined;
    return {
      ...top,
      categories: top?.categories?.map(category => {
        return {
          ...formatLink(category),
          links: category?.links.map(link => formatLink(link))
        }
      })
    }
  }

  _formatBottom (bottom) {
    if (!bottom) return undefined;
    return {
      ...bottom,
      links: bottom?.links?.map(link => this._formatBottomLink(link))
    }
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
        link.label = link?.text ?? link?.label;
        break;

      case link.action === 'consent':
        classes.push('fr-btn--tertiary-no-outline');
        attributes['data-fr-opened'] = false;
        attributes['aria-controls'] = 'consent-modal';
        link.template = 'button';
        link.label = link?.text ?? link?.label;
        break;

      default:
        link = formatLink(link);
    }

    link.classes = classes;
    link.attributes = attributes;

    return link;
  }


}

export { Footer };
