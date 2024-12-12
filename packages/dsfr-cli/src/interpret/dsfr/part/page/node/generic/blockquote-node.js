import { PageNode } from '../page-node.js';

const LEVELS = [
  'note',
  'tip',
  'important',
  'warning',
  'caution'
];

const formatData = (data, level, value, state) => {
  data.level = level;
  data?.children?.[0].children?.[0]?.value = value.replace(`[!${level.toUpperCase()}]\n`, '');

  data?.children.unshift({
    type: 'heading',
    depth: 3,
    children: [{type: 'text', value: state.fragments?.blockquote?.[level]}]
  })
}

class BlockquoteNode extends PageNode {
  constructor (data, state) {
    const blockquoteContent = data?.children?.[0]?.children?.[0];
    const value = blockquoteContent?.value;
    if (value) {
      const level = /^\[!([A-Z]+)\]/.exec(value)?.[1]?. toLowerCase();
      if (LEVELS.includes(level)) formatData(data, level, value, state);
    }

    super(data, state);
    this._level = data.level;
  }

  get level () {
    return this._level;
  }

  get data () {
    return {
      ...super.data,
      level: this.level
    };
  }
}

BlockquoteNode.TYPE = 'blockquote';

export { BlockquoteNode };
