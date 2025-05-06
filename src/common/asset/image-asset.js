import path from 'path';
import { log } from '@gouvfr/dsfr-forge';
import { DEPLOY_FOLDER } from '../constants.js';

class ImageAsset {
  constructor (src, url) {
    this._src = src;
    this._url = url;
    this._dest = path.normalize(`${DEPLOY_FOLDER}${url}`);
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

const create = (url, src, deploy, dest) => {
  const regExpSrc = new RegExp(/^(.*)index(@\w{2})?\.md$/);
  const execSrc = regExpSrc.exec(src);
  if (!execSrc) {
    log.error(`Invalid source file in ImageNode parser: ${src}`);
    return;
  }

  const regExpUrl = new RegExp(/^(.*)\/_asset\/(.*)$/);
  const execUrl = regExpUrl.exec(url);
  if (!execUrl) {
    log.info(`image is not an asset: ${url}`);
    return;
  }

  return new ImageAsset(path.normalize(`${execSrc[1]}${url}`), `${deploy.asset}${dest}/${execUrl[2]}`);
}

ImageAsset.fromState = (url, state) => {
  return create(url, state.src, state.deploy, state.path);
};

ImageAsset.fromConfig = (url, yml) => {
  return create(url, yml.src, yml.deploy, yml.path)
}

export { ImageAsset };
