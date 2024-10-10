import { Renderable } from '../../core/renderable.js';
import { Translate } from '../../component/components/translate.js';
import { Version } from '../../component/components/version.js';
import { Header } from '../../component/components/header.js';

class CustomHeader extends Renderable {
  constructor (data) {
    super(data);
    if (data.translate) this._translate = new Translate(data.translate);
    this._version = new Version(data.version);
    this._header = new Header(data.resource.header);
  }
  async render () {
    let toolsContent = await this._version.render({ collapseId: 'version-collapse' });
    if (this._translate) toolsContent += await this._translate.render({ collapseId: 'translate-collapse' });

    let menuContent = await this._version.render({ collapseId: 'version-collapse-menu' });
    if (this._translate) menuContent += await this._translate.render({ collapseId: 'translate-collapse-menu' });

    return await this._header.render({
      body: {
        tools: {
          toolsContent: toolsContent
        }
      },
      menu: {
        tools: {
          toolsContent: menuContent
        }
      }
    });
  }
}

export { CustomHeader };
