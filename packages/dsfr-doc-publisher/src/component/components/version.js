import { Component } from '../component.js';
import { EJS_PKG } from '../ejs-pkg.js';
class Version extends Component {
  constructor (data) {
    super(data, 'version', EJS_PKG.PUBLISHER);
  }
  get ejsPath () {
    return 'src/component/ejs/version/version.ejs';
  }

  async format () {
    return {
      id: 'version',
      button: { title: this.data.button, kind: 3 },
      collapseId: 'version-collapse',
      versions: this.data.versions
    };
  }
}

export { Version };
