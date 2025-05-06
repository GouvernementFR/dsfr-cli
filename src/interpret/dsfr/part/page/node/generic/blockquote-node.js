import { PageNode } from '../page-node.js';
import { fragments } from '@gouvfr/dsfr-lore';

const LEVELS = [
  'note',
  'tip',
  'important',
  'warning',
  'caution'
];

class BlockquoteNode extends PageNode {
  constructor (data, state) {
    super(data, state);
    this._level = data.level;
  }

  structure (data, state) {
    const blockquoteContent = data?.children?.[0]?.children?.[0];
    const value = blockquoteContent?.value;

    if (!value) return super.structure(data, state);

    const results = /^\[!([A-Z]+)\](\r?\n)?/.exec(value);
    const level = results?.[1]?.toLowerCase();
    const lineBreak = results?.[2];
    const hasLineBreak = !!lineBreak;

    if (!level) return super.structure(data, state);

    const code = `[!${level.toUpperCase()}]`;
    const isCodeSolo = value === code && data.children.length > 1;

    if (LEVELS.includes(level) && (hasLineBreak || isCodeSolo)) {
      data.level = level;

      if (!results[2]) data.children[0].children.splice(0, 1);
      else data.children[0].children[0].value = value.replace(`${code}${lineBreak}`, '');

      data?.children.unshift({
        type: 'heading',
        depth: 3,
        children: [{type: 'text', value: fragments.getFragment(state.i18n.current.code,`blockquote.${level}`)}]
      })
    }

    return super.structure(data, state);
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
