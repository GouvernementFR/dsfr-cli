import ejs from 'ejs';
import { EJS_PKG } from './ejs-pkg.js';

let count = 0;

const uniqueId = (module) => {
  count++;
  return `${module}-${count}`;
};

const DATA = {
  uniqueId: uniqueId,
  dsfrPkg: EJS_PKG.DSFR,
};

const render = async (template, data, pkg = EJS_PKG.DSFR) => await ejs.render(`<%- include('${pkg}${template}') %>`, {...DATA, ...data});

export default render;
