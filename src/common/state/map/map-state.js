import { deepFreeze, log } from '@gouvfr/dsfr-forge';
import { sortMapItems } from '../../utiliy/sort/map-sorting.js';

const RESERVED_KEYS = ['$'];

const flatten = (mapLevel, defaultLocale, locales) => {
  const urls = [];

  if (mapLevel.hasOwnProperty(defaultLocale) && mapLevel[defaultLocale].hasOwnProperty('url')) {
    urls.push({
      loc: mapLevel[defaultLocale].url,
      alts: locales.map(locale => ({ lang: locale, url: mapLevel[locale]?.url })),
    });
  }

  for (const key in mapLevel) {
    switch (true) {
      case locales.includes(key):
      case RESERVED_KEYS.includes(key):
        continue;

      case typeof mapLevel[key] === 'object':
        urls.push(...flatten(mapLevel[key], defaultLocale, locales));
        break;
    }
  }
  return urls;
}

class MapState {
  constructor (data) {
    this._map = data;
    deepFreeze(this._map);
    Object.freeze(this);
  }

  getUrlset (defaultLocale, locales) {
    return flatten(this._map, defaultLocale, locales);
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

    return {
      ...node,
      isCurrent: currentPath && currentPath.indexOf(path) === 0
    };
  }

  getChildNodes (path, locale, defaultLocale, locales, version, rank = null, sort = null, context = 'unknown', currentPath = null) {

    const base = this.getBase(path, version, context);

    if (base === null) return [];

    const keys = Object.keys(base)
      .filter(key => !locales.includes(key) && !RESERVED_KEYS.includes(key));

    const nodes = [];

    for (const key of keys) {
      const settings = base[key].$;
      const content = base[key]?.[locale] ?? base[key]?.[defaultLocale];
      if (!settings || !content) continue;
      if (!!rank && settings.rank !== rank) continue;
      const itemPath = `${path}/${key}`;
      const itemIsCurrent = currentPath && currentPath.indexOf(itemPath) === 0;
      nodes.push({
        $: settings,
        content: {
          ...content,
          path: itemPath,
          isCurrent: itemIsCurrent
        }
      });
    }

    if (sort) {
      sortMapItems(nodes, sort);
    }

    return nodes.map(node => node.content);
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
