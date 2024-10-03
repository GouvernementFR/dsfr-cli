import { deepFreeze, log } from '@gouvfr/dsfr-cli-utils';

class MapState {
  constructor (data) {
    this._map = data;
    deepFreeze(this._map);
    Object.freeze(this);
  }

  getUrl (path, locale, defaultLocale, version) {

    if (typeof path !== 'string') return null;

    let base = this._map[version];
    const segments = path.split('/').filter(segment => segment.length > 0);

    for (const segment of segments) {
      if (base[segment] === undefined) {
        log.error(`Invalid path segment '${segment}' in '${path}' {locale: '${locale}', version: '${version}'}`);
        return null;
      }
      base = base[segment];
    }

    const url =  base[locale] ?? base[defaultLocale];
    return url;
  }

  getRelativeUrl(from, to, locale, defaultLocale, version) {
    const fromSegments = from.split('/').filter(segment => segment.length > 0);
    const toSegments = to.split('/').filter(segment => segment.length > 0 && segment !== '.');

    const partIndex = toSegments.findIndex(segment => segment === '_part');
    const docIndex = toSegments.findIndex(segment => segment === 'doc');
    if (partIndex > -1 && docIndex > -1 && docIndex === partIndex + 1) {
      toSegments.splice(partIndex, 2);
      if (toSegments[0] === '..' && toSegments[1] === '..') toSegments.splice(0, 2);
    }

    return this.getUrl([...fromSegments, ...toSegments].join('/'), locale, defaultLocale, version);
  }
}

export { MapState };
