import { FacetParser } from '../../facet/facet-parser.js';
import fs from 'fs';
import yaml from 'yaml';

class ResourceParser {

  async load (directory, version, locales) {
    const facetParser = new FacetParser(directory, version, 'yml');
    await facetParser.read();
    this._resources = {};
    if (facetParser.has) {
      for (const locale of locales) {
        const resource = {};
        const code = locale.isDefault ? null : locale.code;
        for (const filename of facetParser.filenames) {
          const data = facetParser.loadFacet(code, filename);
          if (data) {
            Object.freeze(data);
            resource[filename] = data;
          }
        }
        Object.freeze(resource);
        this._resources[locale.code] = resource;
      }
    }
    Object.freeze(this._resources);
  }

  getResource (locale) {
    return this._resources[locale.code];
  }
}

export { ResourceParser };
