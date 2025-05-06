import MiniSearch from 'minisearch';

const LOAD_OPTIONS = {
  fields: ['title', 'keywords', 'summary', 'excerpt', 'text'],
  storeFields: ['title', 'url', 'boost', 'summary', 'excerpt', 'cover', 'section'],
};

const SEARCH_OPTIONS = {
  prefix: true,
  boost: { title: 2.5, keywords: 2, summary: 1.5, text: 1 },
  boostDocument: (documentId, query, storedFields) =>
    storedFields?.boost ?? 1,
}

const getOptions = (type) => {
  switch (type) {
    case 'search':
      return SEARCH_OPTIONS;
    default:
      return LOAD_OPTIONS;
  }
}

const ROOT_REGEX = /^(?<root>\/(?<version>v\d+\.\d+|[\w-]+)\/(?<locale>\w+)\/)/;
const CURRENT_VERSION_REGEX = /^(?<root>\/(?<version>v\d+\.\d+|[\w-]+)\/(?<locale>\w+)\/(?<search>v\d+\.\d+|[\w-]+))/

const getSearchIndex = (type) => {
  const searchIndexRegex = type === 'searchPage' ? CURRENT_VERSION_REGEX : ROOT_REGEX;
  const { groups: { root, version, locale } } = window.location.pathname.match(searchIndexRegex);
  return `${root}/index.json`;
}

class SearchEngine {
  async init (type) {
    const response = await fetch(getSearchIndex(type));
    const json = JSON.stringify(await response.json());
    const options = getOptions('load');
    this._miniSearch = MiniSearch.loadJSON(json, options);
  }

  search (query) {
    return this._miniSearch.search(query, getOptions('search'));
  }
}

window.searchEngine = new SearchEngine();
