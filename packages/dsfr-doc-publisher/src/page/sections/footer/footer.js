import render from '../../../render/render.js';
class Footer {
  constructor (data) {
    this._data = this._format(data.resource.footer);
  }

  _format (data) {
    return { footer: {
      top: data?.top,
      brand: {
        logo: {
          title: 'République<br>Française',
        },
        link: data.link
      },
      content: data?.content,
      bottom: this._formatBottom(data?.bottom),
    }};
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
    console.log(links, Array.isArray(links));
    return links.map(link => this._formatBottomLink(link));
  }

  _formatBottomLink (link) {
    console.log('link', link);
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

  async render () {
    this._html = await render('src/component/footer/template/ejs/footer.ejs', this._data);

  }

  get html () {
    return this._html;
  }
}

export { Footer };
