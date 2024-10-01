import ejs from 'ejs';
import { DSFR_SRC, getSrc } from './srcs.js';

let count = 0;

const uniqueId = (module) => {
  count++;
  return `${module}-${count}`;
};

const DATA = {
  uniqueId: uniqueId,
  dsfrSrc: DSFR_SRC
};

const render = async (template, data, src = 'dsfr') => await ejs.render(`<%- include('${getSrc(src)}${template}') %>`, {...DATA, ...data});

export default render;
