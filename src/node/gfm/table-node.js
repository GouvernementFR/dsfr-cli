import { Node } from '../node.js';
import { log } from '@gouvfr/dsfr-forge';

class TableNode extends Node {
  constructor (data) {
    super(data);
    this._caption = data.caption;
    this.attributes.addClass('fr-table');
  }

  structure (data) {
    if (!data.children.length) return data;

    const thead = data.children[0];
    const tbody = data.children.slice(1);

    if (!thead) {
      log.warn('TableNode: missing thead');
      return data;
    }

    if (!tbody.length) {
      log.warn('TableNode: missing tbody');
      return data;
    }

    const isEmptyThead = thead.children.every(child => { return child.type === 'tableCell' && !child.children });
    const hasColThead = tbody.every(child => { return child.children?.[0]?.children?.some(child => child.type === 'strong') });
    const children = [];

    if (isEmptyThead) {
      log.warn('TableNode: thead is empty and is removed');
    } else {
      thead.children = thead.children.map((child, index) => ({
        ...child,
        type: 'tableHeader',
        scope: 'col',
        isColumnHeader: hasColThead && index === 0,
      }));
      children.push({
        type: 'tableHead',
        children: [thead]
      });
    }

    if (hasColThead) {
      tbody.forEach((row) => {
        row.children[0] = {
          ...row.children[0],
          type: 'tableHeader',
          scope: 'row'
        }
      });
    }

    children.push({
      type: 'tableBody',
      children: tbody
    });

    data.children = children;

    return data;
  }

  async render () {
    const caption = this._caption ? `<caption>${this._caption}</caption>` : '';
    return `
      <div ${this.renderAttributes()}>
        <div class="fr-table__wrapper">
          <div class="fr-table__container">
            <div class="fr-table__content">
              <table>
                ${caption}
                ${await this.renderChildren()}
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  get caption () {
    return this._caption;
  }
}

TableNode.TYPE = 'table';

export { TableNode };
