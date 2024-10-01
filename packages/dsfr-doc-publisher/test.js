import { getPackagePath} from './src/utils/package-path.js';

const DSFR_SRC = `${getPackagePath('@gouvfr/dsfr#publisher')}`;

console.log(DSFR_SRC);

/*
import { Page } from './src/page/page.js';


const page = new Page('/Users/lab9/Free/DSFR/Lumières/code/dsfr/.dsfr/button/pages/⧸version-courante⧸fr⧸composants⧸bouton⧸index.yml');
await page.read();
await page.render();

 */
