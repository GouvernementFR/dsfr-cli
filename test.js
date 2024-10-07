
import { Page } from '@gouvfr/dsfr-doc-publisher';
import { createFile } from '@gouvfr/dsfr-cli-utils';

const page = new Page('/Users/lab9/Free/DSFR/Lumières/code/dsfr/.dsfr/button/pages/⧸version-courante⧸fr⧸composants⧸bouton⧸index.yml');
const html = await page.render();

createFile('/Users/lab9/Free/DSFR/Lumières/code/dsfr/.doc/version-courante/fr/composants/bouton/index.html', html);
