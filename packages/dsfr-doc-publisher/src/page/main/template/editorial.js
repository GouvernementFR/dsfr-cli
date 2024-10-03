import { Template } from './template.js';
import factory from './factory.js';
import { Sidemenu } from '../../../elements/sidemenu.js';
import { Breadcrumb } from '../../../elements/breadcrumb.js';
import { Contents } from '../contents/contents.js';

const EDITORIAL = 'editorial';

class Editorial extends Template{
  constructor (data) {
    super(data, EDITORIAL);

    this._hasSidemenu = data.sidemenu !== undefined;

    if (this._hasSidemenu) {
      this._sidemenu = new Sidemenu(data.sidemenu);
    }

    this._breadcrumb = new Breadcrumb(data.breadcrumb, data.resource.breadcrumb);

    this._contents = new Contents(data);
  }

  async render () {
    await this._breadcrumb.render();
    await this._contents.render();
    if (this._hasSidemenu) {
      await this._sidemenu.render();
    }
  }

  get html () {
    const cols = [];
    if (this._hasSidemenu) {
      cols.push(`
                <div class="fr-col-12 fr-col-md-4">
                    ${this._sidemenu.html}
                </div>
            `);
    }

    cols.push(`
                <div class="fr-col-12 fr-col-md-8">
                    ${this._breadcrumb.html}
                    ${this.htmlContents}
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
