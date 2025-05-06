class Commit {
  constructor (data) {
    this._data = data;
    const gitmojis = data.gitmojis;
    if (data.isBreaking && !gitmojis.includes('💥')) {
      gitmojis.unshift('💥');
    }
    this._title = `[#${data.id}](${data.pull}) : ` + (gitmojis.length > 0 ? `${gitmojis.join('')} `: '') + data.title;
    this._type = data.type;
    this._scope = data.scopes.length > 0 ? `${data.scopes.join(', ')}` : '';
    this._description = data.description.replace(/\n/g, '\n\n');
  }

  render () {
    return `#### ${this._title}
\`${this._type} ${this._scope ? `(${this._scope})` : ''}\`

${this._description}

---

`;
    }
}

export { Commit };
