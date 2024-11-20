import { deepFreeze, log } from '@gouvfr/dsfr-cli-utils';

const slim = node => ({ ...node, sort: undefined, kind: undefined });

class MapState {
  constructor (data) {
    this._map = data;
    deepFreeze(this._map);
    Object.freeze(this);
  }

  getBase (path, version, context = 'unknown') {
    if (typeof path !== 'string') {
      log.error(`Invalid path '${path}' { context: '${context}' }`);
      return null;
    }

    let base = this._map[version];
    const segments = path.split('/').filter(segment => segment.length > 0);

    for (const segment of segments) {
      if (base[segment] === undefined) {
        log.error(`Invalid path segment '${segment}' in '${path}' { context: '${context}' }`);
        return null;
      }
      base = base[segment];
    }

    return base;
  }

  getNode (path, locale, defaultLocale, version, context = 'unknown', currentPath = null) {

    const base = this.getBase(path, version, context);

    if (base === null) return null;

    const node = base?.[locale] ?? base?.[defaultLocale];
    if (node === undefined) {
      log.error(`Invalid '${path}' { context: '${context}' }`);
      return null;
    }

    const thin = slim(node);

    if (currentPath) thin.isCurrent = currentPath.indexOf(path) === 0;

    return thin;
  }

  getChildNodes (path, locale, defaultLocale, locales, version, kind = null, context = 'unknown', currentPath = null) {

    const base = this.getBase(path, version, context);

    if (base === null) return [];

    const keys = Object.keys(base)
      .filter(key => !locales.includes(key));

    const nodes = [];

    for (const key of keys) {
      const node = { ...base[key]?.[locale] ?? base[key]?.[defaultLocale] };
      if (!node) continue;
      if (!!kind && node.kind !== kind) continue;
      node.path = `${path}/${key}`;
      if (currentPath) node.isCurrent = currentPath.indexOf(node.path) === 0;
      nodes.push(node);
    }

    return nodes
      .sort((a, b) => (a.sort ?? 10000) - (b.sort ?? 10000))
      .map(node => slim(node))
  }

  getRelativeNode(from, to, locale, defaultLocale, version, context = 'unknown') {
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

    return this.getNode([...fromSegments, ...toSegments].join('/'), locale, defaultLocale, version, context);
  }
}

export { MapState };
