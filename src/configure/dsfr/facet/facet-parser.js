import fs from 'fs';
import path from 'path';
import { Facet } from './facet.js';

class FacetParser {
  constructor (directory, version, extension, filename = null) {
    this._directory = directory;
    this._extension = extension.indexOf('.') > -1 ? extension : `.${extension}`;
    this._version = version;
    this._filename = filename;
  }

  async read () {
    this._facets = fs.readdirSync(this._directory, { withFileTypes: true })
      .filter(file =>  file.isFile() && path.extname(file.name) === this._extension)
      .map(file => new Facet(file.name, this._version))
      .filter(facet => facet.isSatisfying && facet.testFilename(this._filename));

    this._filenames = this._facets.map(facet => facet.filename).filter((filename, index, filenames) => filenames.indexOf(filename) === index);
  }

  get has () {
    return this._facets.length > 0;
  }

  get filenames () {
    return this._filenames;
  }

  getFacet (locale = null, filename = null) {
    const filterFilename = filename ? facet => facet.filename === filename : facet => true;
    const filterLocale = locale ? facet => (facet.isAlt && facet.testLocale(locale)) || !facet.isAlt : facet => !facet.isAlt;
    const facets =  this._facets
      .filter(filterFilename)
      .filter(filterLocale)
      .sort((a, b) => b.relevance - a.relevance);
    return facets.length > 0 ? facets[0] : null;
  }
}

export { FacetParser };
