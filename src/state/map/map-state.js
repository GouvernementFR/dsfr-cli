import { deepFreeze, log } from '@gouvfr/dsfr-cli-utils';

class MapState {
  constructor (data) {
    this._map = data;
    deepFreeze(this._map);
    Object.freeze(this);
  }

  getUrl (path, locale, defaultLocale, version, context = 'unknown') {

    if (typeof path !== 'string') {
      log.error(`Invalid path '${path}' { context: '${context}' }`);
      return '/';
    }

    let base = this._map[version];
    const segments = path.split('/').filter(segment => segment.length > 0);

    for (const segment of segments) {
      if (base[segment] === undefined) {
        log.error(`Invalid path segment '${segment}' in '${path}' { context: '${context}' }`);
        return '/';
      }
      base = base[segment];
    }

    const url =  base[locale] ?? base[defaultLocale];
    return url;
  }

  getRelativeUrl(from, to, locale, defaultLocale, version, context = 'unknown') {
    const fromSegments = from.split('/').filter(segment => segment.length > 0);
    const toSegments = to.split('/').filter(segment => segment.length > 0 && segment !== '.');

    const partIndex = toSegments.findIndex(segment => segment === '_part');
    const docIndex = toSegments.findIndex(segment => segment === 'doc');
    if (partIndex > -1 && docIndex > -1 && docIndex === partIndex + 1) {
      toSegments.splice(partIndex, 2);
      if (toSegments[0] === '..' && toSegments[1] === '..') toSegments.splice(0, 2);
    }

    if (toSegments.length > 0 && toSegments[0] === '..') {
      while (toSegments.length > 0 && toSegments[0] === '..') {
        toSegments.shift();
        fromSegments.pop();
      }
    }

    return this.getUrl([...fromSegments, ...toSegments].join('/'), locale, defaultLocale, version, context);
  }
}

export { MapState };
