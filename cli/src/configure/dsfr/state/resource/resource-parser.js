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

          const facet = facetParser.getFacet(code, filename);
          const faceData = fs.readFileSync(`${directory}/${facet.name}`, 'utf8');
          if (facet) {
            resource[filename] = yaml.parse(faceData);
            Object.freeze(resource[filename]);
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
