import { instantiateElements } from '../main/core/element.js'
import { SearchBar } from '../main/elements/search-bar/index.js';
import { SearchPage } from './elements/search-page.js';


window.onload = async () => {
  await instantiateElements('#search', SearchBar);
  await instantiateElements('#results-page', SearchPage);
};
