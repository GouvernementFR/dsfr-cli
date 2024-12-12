import { PageNode } from '../page-node.js';

const LEVELS = [
  'note',
  'tip',
  'important',
  'warning',
  'caution'
];

class BlockquoteNode extends PageNode {
  constructor (data, state) {
    const blockquoteContent = data?.children?.[0]?.children?.[0];
    const value = blockquoteContent?.value;
    if (value) {
      const results = /^\[!([A-Z]+)\](\n)?/.exec(value);
      const hasLineBreak = !!results?.[2];
      const level = results?.[1]?.toLowerCase();
      const code = `[!${level.toUpperCase()}]`;
      const hasCodeAside = value === code && data.children.length > 1;

      if (LEVELS.includes(level) && (hasLineBreak || hasCodeAside)) {
        data.level = level;

        if (!results[2]) data.children[0].children.splice(0, 1);
        else data.children[0].children[0].value = value.replace(`${code}\n`, '');

        data?.children.unshift({
          type: 'heading',
          depth: 3,
          children: [{type: 'text', value: state.fragments?.blockquote?.[level]}]
        })
      };
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
