import { Component } from '../component.js';

class Breadcrumb extends Component {
  constructor (data) {
    super(data, 'breadcrumb');
  }
  get ejsPath () {
    return 'src/dsfr/component/breadcrumb/template/ejs/breadcrumb.ejs';
  }

  async format () {
    const chunks = [''];
    const segments = this.data.segments.map((segment)  => this._formatSegment(segment, chunks));
    segments[0].path = `/${segments[0].path}`;
    return {
      id: 'breadcrumb',
      segments: segments,
      button: this.data.button
    };
  }

  _formatSegment (segment, chunks) {
    const missing = segment.url.split('/').filter((chunk) => !chunks.includes(chunk));
    chunks.push(...missing);

    return {
      label: segment.label ?? segment.text,
      path: missing.join('/')
    };
  }
}

export { Breadcrumb };
