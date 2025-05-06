const HTML_NODE_CLOSURES = {
  ENTER: 'enter',
  EXIT: 'exit',
  SELF: 'self'
}

class HtmlNodeParser {
  constructor (node) {
    this._node = node;
    const tagRegex = new RegExp(/^<\/?(\w+)/, 'gmi');
    this._tagName = tagRegex.exec(node.value)?.[1];
    this._attributes = {};
    this._classes = [];

    switch (true) {
      case node.value.startsWith('</'):
        this._closure = HTML_NODE_CLOSURES.EXIT;
        break;
      case node.value.endsWith('/>'):
        this._closure = HTML_NODE_CLOSURES.SELF;
        this._parseAttributes();
        break;
      default:
        this._closure = HTML_NODE_CLOSURES.ENTER;
        this._parseAttributes();
    }
  }

  _parseAttributes () {
    const attrRegex = new RegExp(/\s+(\w+)(\s*=\s*("([^"]*)"|'([^']*)'))?/, 'gmi');
    let result;

    while ((result = attrRegex.exec(this._node.value)) !== null) {
      const [_, key, __, ___, doubleValue, singleValue] = result;
      this._attributes[key] = doubleValue || singleValue || true;
    }

    if (this._attributes.class) this._classes = this._attributes.class.split(' ');
  }

  get node () {
    return this._node;
  }

  get closure () {
    return this._closure;
  }

  get tagName () {
    return this._tagName;
  }

  get attributes () {
    return this._attributes;
  }

  get classes () {
    return this._classes;
  }
}

export { HtmlNodeParser, HTML_NODE_CLOSURES };
