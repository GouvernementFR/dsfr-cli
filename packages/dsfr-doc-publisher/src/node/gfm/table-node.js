import { Node } from '../node.js';

class TableNode extends Node {
  constructor (data) {
    data.children = data.children.map((child, index) => ({
      ...child,
      level: index === 0 ? 'thead' : undefined,
      align: data?.align || null
    }));
    super(data, `table`);
  }

  async render () {
    return `
      <div class="fr-table">
        <div class="fr-table__wrapper">
          <div class="fr-table__container">
            <div class="fr-table__content">
              ${await super.render()}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

TableNode.TYPE = 'table';

export { TableNode };
