import path from 'path';
import { log } from '@gouvfr/dsfr-cli-utils';
import { DEPLOY_DIR } from '../../../../constants.js';

class ImageAsset {
  constructor (url, state) {
    this._parse(url, state);
  }

  _parse (url, state) {
    const regExpSrc = new RegExp(/^(.*)index(@\w{2})?\.md$/);
    const execSrc = regExpSrc.exec(state.src);
    if (!execSrc) {
      log.error(`Invalid source file in ImageNode parser: ${state.src}`);
      return;
    }
    this._src = path.normalize(`${execSrc[1]}${url}`);

    const regExpUrl = new RegExp(/^(.*)\/asset\/(.*)$/);
    const execUrl = regExpUrl.exec(url);
    if (!execUrl) {
      log.error(`Invalid url in ImageNode parser: ${url}`);
      return;
    }
    this._url = `/${state.version.text}/asset${state.path}/${execUrl[2]}`;
    this._dest = `${DEPLOY_DIR}${this._url}`;
  }

  get src () {
    return this._src;
  }

  get url () {
    return this._url;
  }

  get dest () {
    return this._dest;
  }

  get data () {
    return {
      src: this._src,
      url: this._url,
      dest: this._dest
    }
  }
}

export { ImageAsset };
