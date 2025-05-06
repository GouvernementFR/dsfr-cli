import { copyFile } from '@gouvfr/dsfr-forge';

class ImageRefiner {
  constructor (name, state) {
    this._name = name;
    this._state = state;
  }

  async write () {
    copyFile(this._state.src, this._state.dest);
  }
}

export { ImageRefiner };
