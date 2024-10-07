import { Template } from '../template.js';
import factory from '../factory.js';
import { Sidemenu } from '../../../../component/components/sidemenu.js';
import { Breadcrumb } from '../../../../component/components/breadcrumb.js';

const EDITORIAL = 'editorial';

class Editorial extends Template {
  constructor (data) {
    super(data, EDITORIAL);

    this._hasSidemenu = data.sidemenu !== undefined;

    if (this._hasSidemenu) this._sidemenu = new Sidemenu(data.sidemenu);

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
                <div class="fr-grid-row fr-grid-row--gutters">
                    ${cols.join('')}
                 </div>
            </div>`;
  }
}

factory.register(EDITORIAL, Editorial, true);
