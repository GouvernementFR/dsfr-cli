class Node {
  constructor (data) {
    this._type = data.type;
    this._value = data.value;
  }

  get type () {
    return this._type;
  }
}
