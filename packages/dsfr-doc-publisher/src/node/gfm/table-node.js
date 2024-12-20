import { Node } from '../node.js';

class TableNode extends Node {
  constructor (data) {
    data.children = data.children.map((child, index) => ({
      ...child,
      isThead: index === 0,
      align: data?.align || null
    }));
    super(data);
    this.attributes.addClass('fr-table');
  }

  async renderChildren () {
    if (!this._children.length) return;

    let html = `<thead>${await this._children[0].render()}</thead>`;
    html += `<tbody>`;
    for (const child of this._children.slice(1)) {
      html += await child.render();
    }
    html += `</tbody>`;
    return html;
  }

  async render () {
    return `
      <div ${this.renderAttributes()}>
        <div class="fr-table__wrapper">
          <div class="fr-table__container">
            <div class="fr-table__content">
              <table>
                ${await this.renderChildren()}
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

TableNode.TYPE = 'table';

export { TableNode };
