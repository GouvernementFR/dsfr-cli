import { Node } from '../../node.js';

const VALIGN = new Map([
  ['top', 'fr-cell--top'],
  ['bottom', 'fr-cell--bottom']
]);

class TableContainerDirective extends Node {
  constructor (data) {
    super(data);
    this.applyAttributes(data.attributes);
  }

  applyAttributes (attributes) {
    const table = this.findDescendantsByType('table')[0];
    if (!table) return;
    if (attributes.scroll === 'false') table.attributes.addClass('fr-table--no-scroll');

    const cellCount = table.children[0].children.length;

    const valign = attributes.valign ? attributes.valign.split(',') : null;
    if (valign?.length === 1 && VALIGN.has(valign[0])) {
      valign.length = cellCount;
      valign.fill(valign[0]);
    }

    table.children.forEach((row, index) => {
      row.children.forEach((cell, cellIndex) => {
        if (valign && valign[cellIndex] && VALIGN.has(valign[cellIndex])) {
          cell.attributes.addClass(VALIGN.get(valign[cellIndex]));
        }
      });
    });
  }
}

TableContainerDirective.NAME = 'dsfr-doc-table';

export { TableContainerDirective };
