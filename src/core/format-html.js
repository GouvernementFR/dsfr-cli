import { log } from '@gouvfr/dsfr-forge';
import * as prettier from 'prettier';
import htmlParser from 'prettier/parser-html';

export const formatHtml = async (html, src = 'unknown') => {
  try {
    const pretty = await prettier.format(html, { parser: 'html', plugins: [htmlParser], tabWidth: 2, });
    return pretty;
  }
  catch (error) {
    log.error(`Error while formatting HTML @ ${src}`);
    log.error(error);
  }

  return html;
}
