import { Template } from '../template.js';
import { Sidemenu } from '../../component/components/sidemenu.js';
import { Breadcrumb } from '../../component/components/breadcrumb.js';

class EditorialTemplate extends Template {
  constructor (data) {
    super(data);

    this._hasSidemenu = data?.resource?.navigation?.sidemenu !== undefined;

    if (this._hasSidemenu) this._sidemenu = new Sidemenu(data.resource.navigation.sidemenu);

    this._breadcrumb = new Breadcrumb(data.breadcrumb);
  }

  async render () {
    const cols = [];
    if (this._hasSidemenu) {
      cols.push(`
                <div class="fr-col-12 fr-col-md-4">
                    ${await this._sidemenu.render()}
                </div>
            `);
    }

    cols.push(`
                <div class="fr-col-12 fr-col-md-8">
                    ${await this._breadcrumb.render()}
                    ${await super.render()}
                </div>
            `);


    return `
            <div class="fr-container">
                <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
                    ${cols.join('')}
                 </div>
            </div>`;
  }
}

EditorialTemplate.TYPE = 'editorial';

export { EditorialTemplate };
