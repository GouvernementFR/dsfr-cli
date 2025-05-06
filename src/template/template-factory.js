import { HomeTemplate } from './templates/home-template.js';
import { EditorialTemplate } from './templates/editorial-template.js';
import { SearchTemplate } from './templates/search-template.js'

const TEMPLATES = [
  EditorialTemplate,
  HomeTemplate,
  SearchTemplate
];

const templatesMap = new Map(TEMPLATES.map((Template) => [Template.NAME, Template]));

export const templateFactory = (data) => {
  const Template = templatesMap.get(data.template) ?? TEMPLATES[0];
  return new Template(data);
};
