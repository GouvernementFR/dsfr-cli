import fs from 'fs';
import { copyDir, getPackagePath } from '@gouvfr/dsfr-cli-utils';
import { DEPLOY_DIR } from '../../../constants.js';

const DIST = `${getPackagePath('@gouvfr/dsfr#publisher')}dist`;

const integrate = async () => {
  if (fs.existsSync(`${DEPLOY_DIR}/dist`)) return;
  await copyDir(DIST, `${DEPLOY_DIR}/dist`);
}

export { integrate };
