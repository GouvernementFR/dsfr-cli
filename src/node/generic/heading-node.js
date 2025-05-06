import { Node } from '../node.js';
import { log } from '@gouvfr/dsfr-forge';

class HeadingNode extends Node {
  constructor (data) {
    super(data, `h${data.depth}`, false, true);
    this._depth = data.depth;
  }

  adjust (map) {
    if (map.has(this.data.depth)) {
      this._depth = map.get(this.data.depth);
      this.tagName = `h${this._depth}`;

      switch (true) {
        case this._data?.data?.isSemantic:
        case this.attributes.classes.some(className => className.match(/^fr-h\d$/) || className.match(/__title$/)):
          break;

        default:
          this.attributes.addClass(`fr-h${this.data.depth}`);
      }
    }
  }
}

HeadingNode.TYPE = 'heading';

const adjustHeading = (nodes) => {
  let isPromoted = false;
  const headings = nodes.map(node => node.data.depth);

  if (headings.indexOf(1) === -1) {
    if (headings.filter(heading => heading === 2).length === 1) {
      log.warn('No h1 found in the document, promoting h2 to h1');
      isPromoted = true;
    } else {
      log.warn('No h1 found in the document');
    }
  } else if (!headings.filter(heading => heading === 1).length > 1) {
    log.warn('Several instance of h1 found in the document');
  }

  const depths = headings.filter((heading, index, self) => self.indexOf(heading) === index && (heading > 1 || isPromoted) ).sort((a, b) => a - b);

  const mapped = depths.map((depth, index) => [depth, index + (isPromoted ? 1 : 2)]).filter(([depth, index]) => depth !== index);
  const map = new Map(mapped);

  if (map.size === 0) return;

  log.warn(`Adjusting heading levels : ${Array.from(map).map(([from, to]) => `h${from} -> h${to}`).join(', ')}`);

  nodes.forEach(node => node.adjust(map));
};

export { HeadingNode, adjustHeading};
