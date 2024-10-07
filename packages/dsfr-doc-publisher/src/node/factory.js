class NodeFactory {
  constructor() {
    this._constructors = {};
    this._defaultConstructor = null;
  }

  register(type, nodeConstructor, isDefault = false) {
    this._constructors[type] = nodeConstructor;
    if (!isDefault) return;
    if (this._defaultConstructor !== null) throw new Error('default node already defined');
    this._defaultConstructor = nodeConstructor;
  }

  _getConstructor(type) {
    return this._constructors[type] ?? this._defaultConstructor;
  }

  create (type, data) {
    const NodeConstructor = this._getConstructor(type);
    return new NodeConstructor(data);
  }
}

const factory = new NodeFactory();

export default factory;
