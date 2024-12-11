import { PageNode } from '../page-node.js';

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
    switch (true) {
      case !value:
        break;

      case value.startsWith('[!NOTE]'):
        formatData(data, 'note', value, state);
        break;

      case value.startsWith('[!WARNING]'):
        formatData(data, 'warning', value, state);
        break;

      case value.startsWith('[!IMPORTANT]'):
        formatData(data, 'important', value, state);
        break;

      case value.startsWith('[!TIP]'):
        formatData(data, 'tip', value, state);
        break;

      case value.startsWith('[!CAUTION]'):
        formatData(data, 'caution', value, state);
        break;

      default:
        break;
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
