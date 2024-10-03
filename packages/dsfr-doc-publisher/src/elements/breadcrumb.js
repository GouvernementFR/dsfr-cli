import render from '../render/render.js';

class Breadcrumb {
  constructor (data, resource) {
    let parts = [''];
    const segments = data.segments.map((segment) => {
      const np = segment.href.split('/').filter((p) => !parts.includes(p));
      parts.push(...np);

      return {
        label: segment.label,
        path: np.join('/'),
      };
    });
    segments[0].path = `/${segments[0].path}`;
    this._data = {
      breadcrumb: {
        id: 'breadcrumb',
        segments: segments,
        button: resource.button
      }
    };
  }

  async render () {
    this._html = await render('src/component/breadcrumb/template/ejs/breadcrumb.ejs', this._data);
  }

  get html () {
    return this._html;
  }
}

export { Breadcrumb };
