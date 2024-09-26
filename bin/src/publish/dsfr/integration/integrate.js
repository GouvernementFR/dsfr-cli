import fs from 'fs';
import { getPackagePath } from '../utils/package-path.js';
import { DEPLOY_DIR } from '../../../constants.js';
import { copyDir } from '../../../utils/file.js';

const DIST = `${getPackagePath('@gouvfr/dsfr#publisher')}dist`;

const integrate = async () => {
  if (fs.existsSync(`${DEPLOY_DIR}/dist`)) return;
  await copyDir(DIST, `${DEPLOY_DIR}/dist`);
}

export { integrate };
