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
      bottom: data?.bottom,
    }};
  }

  async render () {
    this._html = await render('src/component/footer/template/ejs/footer.ejs', this._data);

  }

  get html () {
    return this._html;
  }
}

export { Footer };
