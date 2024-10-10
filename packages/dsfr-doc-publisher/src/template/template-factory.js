import { HomeTemplate } from './templates/home-template.js';
import { EditorialTemplate } from './templates/editorial-template.js';

const TEMPLATES = [
  EditorialTemplate,
  HomeTemplate,
];

const templatesMap = new Map(TEMPLATES.map((Template) => [Template.name, Template]));

export const templateFactory = (data) => {
  const Template = templatesMap.get(data.template) ?? TEMPLATES[0];
  return new Template(data);
};
