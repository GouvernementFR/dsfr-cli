import { Node } from '../node.js';
import { log, normalize } from '@gouvfr/dsfr-cli-utils';

class HeadingNode extends Node {
  constructor (data) {
    super(data);
    this._depth = data.depth;
    this._isAdjusted = false;
  }

  adjust (map) {
    if (map.has(this.data.depth)) {
      this._depth = map.get(this.data.depth);
      this._isAdjusted = true;
    }
  }

  async render() {
    const heading = `h${this._depth}`;
    const classes = [];
    if (this._isAdjusted) {
      classes.push(`fr-h${this.data.depth}`);
    }
    const text = await super.render();
    const attributes = {
      class: classes.join(' '),
      id: normalize(text)
    };
    return `<${heading}${Object.entries(attributes).map(([key, value]) => ` ${key}="${value}"`)}>${text}</${heading}>`;
  }
}

HeadingNode.TYPE = 'heading';

const adjustHeading = (nodes) => {
  const headings = nodes.map(node => node.data.depth);

  if (headings.indexOf(1) === -1) {
    log.warn('No h1 found in the document');
  }

  if (!headings.filter(heading => heading === 1).length> 1) {
    log.warn('Several instance of h1 found in the document');
  }

  const depths = headings.filter((heading, index, self) => self.indexOf(heading) === index && heading > 1).sort((a, b) => a - b);

  const mapped = depths.map((depth, index) => [depth, index + 2]).filter(([depth, index]) => depth !== index);
  const map = new Map(mapped);

  if (map.size === 0) return;

  log.warn(`Adjusting heading levels : ${Array.from(map).map(([from, to]) => `h${from} -> h${to}`).join(', ')}`);

  nodes.forEach(node => node.adjust(map));
};

export { HeadingNode, adjustHeading};
