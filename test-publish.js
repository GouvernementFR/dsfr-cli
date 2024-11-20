
import { Page } from '@gouvfr/dsfr-doc-publisher';
import { createFile } from '@gouvfr/dsfr-cli-utils';
import { StyleCompiler } from '@gouvfr/dsfr-compiler';
import { DEPLOY_DIR, PUBLISHER_MODULE } from './src/constants.js';

const publish = async (src, dest) => {
  const page = new Page(src);
  await page.read();
  const html = await page.render();
  createFile(dest, html);
}

await publish('/Users/lab9/Free/DSFR/Lumières/code/dsfr/.dsfr/button/pages/⧸version-courante⧸fr⧸composants⧸bouton⧸index.yml', '/Users/lab9/Free/DSFR/Lumières/code/dsfr/.doc/version-courante/fr/composants/bouton/index.html');
await publish('/Users/lab9/Free/DSFR/Lumières/code/dsfr/.dsfr/analytics/pages/⧸version-courante⧸fr⧸mesure-d-audience⧸index.yml', '/Users/lab9/Free/DSFR/Lumières/code/dsfr/.doc/version-courante/fr/mesure-d-audience/index.html');

const styleCompiler = new StyleCompiler();
await styleCompiler.compile(`${PUBLISHER_MODULE}/src/style/index.scss`, `/Users/lab9/Free/DSFR/Lumières/code/dsfr/.doc/lib`, 'dsfr-doc', { minify: true, map: true });
