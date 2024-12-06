import { Node } from '../node.js';

class TableNode extends Node {
  constructor (data) {
    data.children = data.children.map((child, index) => {
      if (index === 0) child.level = 'thead';
      child.align = data.align && data.align.length ? data.align : null;
      return child;
    });
    super(data, `table`);
  }

  async render () {
    let html = '';
    for (const child of this._children) {
      html += await child.render();
    }

    return `
      <div class="fr-table">
        <div class="fr-table__wrapper">
          <div class="fr-table__container">
            <div class="fr-table__content">
              <${this.tagName}${this.renderAttributes()}>
                ${html}
              </${this.tagName}>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

TableNode.TYPE = 'table';

export { TableNode };
