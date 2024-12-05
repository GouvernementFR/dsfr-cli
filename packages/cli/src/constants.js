import { getPackagePath } from '@gouvfr/dsfr-cli-utils';

export const CONFIG_DIR = '.dsfr';
export const DEPLOY_DIR = '.doc';

export const DIST = `${getPackagePath('@gouvfr/dsfr#publisher')}dist`;

export const PUBLISHER_MODULE = getPackagePath('@gouvfr/dsfr-doc-publisher');

export const DOMAIN = 'https://www.systeme-de-design.gouv.fr/';
