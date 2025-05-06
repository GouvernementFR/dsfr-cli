import { Node } from '../../../node.js';
import { log } from '@gouvfr/dsfr-forge';

const VALIGN = new Map([
  ['top', 'fr-cell--top'],
  ['bottom', 'fr-cell--bottom']
]);

class TableContainerDirective extends Node {
  constructor (data) {
    super(data);
    this.applyProperties(data.properties);
  }

  structure (data) {
    const directiveLabel = data.children?.[0];
    if (!directiveLabel.data?.directiveLabel) {
      log.warn('TableContainerDirective: missing caption');
      return data;
    }
    data.children.shift();
    const table = data.children?.find(child => child.type === 'table');
    if (table ) {
      table.caption = directiveLabel.children?.[0]?.value;
    }
    return data;
  }

  applyProperties (properties) {
    const table = this.findDescendantsByType('table')[0];
    if (!table) return;

    if (properties.scroll === 'false') table.attributes.addClass('fr-table--no-scroll');
    if (properties.caption === 'false') table.attributes.addClass('fr-table--no-caption');

    const cellCount = table.children[0].children.length;

    const valign = properties.valign ? properties.valign.split(',') : null;
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

TableContainerDirective.NAME = 'dsfr-doc-table'; //TODO: fr-table ?

export { TableContainerDirective };
