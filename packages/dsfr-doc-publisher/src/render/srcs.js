import { getPackagePath } from '@gouvfr/dsfr-cli-utils';

export const DSFR_SRC = `${getPackagePath('@gouvfr/dsfr#publisher')}`;

export const PUBLISHER_SRC = `${getPackagePath('@gouvfr/dsfr-doc-publisher')}`;

export const getSrc = (name = '') => {
  switch (name) {
    case 'publisher':
      return PUBLISHER_SRC;
    case 'dsfr':
    default:
      return DSFR_SRC;
  }
}
