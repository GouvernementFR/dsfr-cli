class PageElement {
  constructor (data) {
    this._type = data.type;
    this._value = data.value;

    this._children = data.children ? data.children.map(childData => new PageElement(childData)) : [];
  }

  get children () {
    return this._children;
  }

  get data () {
    const data = {
      type: this._type,
      value: this._value
    };

    if (this._children.length) {
      data.children = this._children.map(child => child.data);
    }

    return data;
  }
}

export { PageElement };
