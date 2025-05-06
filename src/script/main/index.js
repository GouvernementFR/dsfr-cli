import './minisearch/index.js';
import { instantiateElements } from './core/element.js'
import CopySnippet from './elements/copy-snippet.js';
import Storybook from './elements/storybook.js';
import { SearchBar } from './elements/search-bar/index.js';
import { ConsentManagementPlatform } from './cmp/index.js';

window.onload = async () => {
  await instantiateElements('.code-snippet--copy', CopySnippet);
  await instantiateElements('.storybook-leaf iframe', Storybook);
  await instantiateElements('#search', SearchBar);
};

const consentResource = window.resource?.consent || {};
const cmp = new ConsentManagementPlatform(consentResource);
cmp.init();
