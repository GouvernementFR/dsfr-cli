import fs from 'fs';
import { PageParser } from './page/page-parser.js';
import { FacetParser } from '../../facet/facet-parser.js';
import { PageRank } from '../../../../common/constants.js'
import { sortMapItems } from '../../../../common/utiliy/sort/map-sorting.js';

class DocParser {
  constructor (state, parent, part, id, rank) {
    this._state = state;
    this._parent = parent;
    this._ids = this._parent ? [ ...this._parent.ids, id] : [''];
    this._part = part;
    this._rank = rank;
    this._id = id;
    this._depth = rank === PageRank.PART ? 0 : parent.depth + 1;
    this._children = [];
    this._pages = [];
  }

  get src () {
    return this._state.src;
  }

  get has () {
    return this._has;
  }

  get part () {
    return this._part;
  }

  get rank () {
    return this._rank;
  }

  get id () {
    return this._id;
  }

  get ids () {
    return this._ids;
  }

  get parent () {
    return this._parent;
  }

  get children () {
    return this._children;
  }

  get depth () {
    return this._depth;
  }

  get path () {
    return this._path;
  }

  get map () {
    return this._map;
  }

  get filenames () {
    return this._filenames;
  }

  getPage (locale) {
    return this._pages.find(page => page.locale.code === locale.code);
  }

  getAlts (locale) {
    return this._alts.filter(alt => alt.lang !== locale.code);
  }

  getLanguages (locale) {
    return this._alts.map(alt => ({
      active: alt.lang === locale.code,
      url: alt.url,
      locale: alt.lang
    }));
  }

  async read () {
    if (!fs.existsSync(this.src)) return;

    this._facetParser = new FacetParser(this.src, this._state.version.core, 'md', 'index');
    await this._facetParser.read();

    if (!this._facetParser.has) return;

    const defaultFacet = this._facetParser.getFacet();
    if (!defaultFacet) return;

    this._path = this._ids.join('/');
    const stateWithPath = this._state.setPath(this._path);

    const state = stateWithPath.localize(null, defaultFacet.name);
    const page = new PageParser(state, this);
    await page.read();

    if (!page.has) return;
    this._has = true;
    this._pages = [page];
    const mapSettings = page.mapSettings;
    this._map = {
      [page.locale.code]: page.map,
      $: {
        ...mapSettings,
        id: this._id,
        rank: this._rank,
      }
    };

    this._alts = [page.alt];
    this._filenames = {
      [page.locale.code]:[page.filename]
    };

    for (const locale of this._state.i18n.alts) {
      const altFile = this._facetParser.getFacet(locale.code);
      const state = stateWithPath.localize(locale, altFile.name);
      const page = new PageParser(state, this);
      await page.read();
      if (!page.has) continue;
      this._pages.push(page);
      this._map[locale.code] = page.map;
      this._alts.push(page.alt);
      if (!this._filenames[locale.code]) this._filenames[locale.code] = [];
      this._filenames[locale.code].push(page.filename);
    }

    const entries = fs.readdirSync(this.src, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const state = this._state.descend(entry.name);
      const doc = new DocParser(state, this, this._part, entry.name, PageRank.PAGE);
      await doc.read();
      if (!doc.has) continue;
      this._children.push(doc);
      for (const locale in doc.filenames) {
        if (!this._filenames[locale]) this._filenames[locale] = [];
        this._filenames[locale].push(...doc.filenames[locale]);
      }
    }

    const childrenMaps = this._children.map(child => child.map);



    if (mapSettings.sort) {
      sortMapItems(childrenMaps, mapSettings.sort);
    }

    childrenMaps.forEach(mapItem => {
      this._map[mapItem.$.id] = mapItem;
    })
  }

  get data () {
    return {
      path: this._path,
      pages: this._filenames
    };
  }

  async write () {
    for (const page of this._pages) {
      await page.write();
    }

    for (const child of this._children) {
      await child.write();
    }
  }
}

export { DocParser };
