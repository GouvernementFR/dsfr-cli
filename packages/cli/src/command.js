class Command {
  constructor(cmd, description) {
    this.cmd = cmd;
    this.description = description;
  }

  get usage () {
    return '';
  }

  get example () {
    return '';
  }

  get options () {
    return [];
  }

  builder (yargs) {
    yargs = yargs
      .usage(`Usage: $0 ${this.usage}`)
      .example(`$0 ${this.usage}`, this.example)
    for (let option of this.options) {
      yargs = yargs.option(option.key, option.opt);
    }
    return yargs;
  }

  async handler (argv) {}

  add (yargs) {
    return yargs.command(this.cmd, this.description, this.builder.bind(this), this.handler.bind(this));
  }
}

class CommandOption {
  constructor(key, describe, type, alias = null) {
    this._key = key;
    this._describe = describe;
    this._type = type;
    this._alias = alias;
  }

  get key () {
    return this._key;
  }

  get opt () {
    const opt = {
      describe: this._describe,
      type: this._type
    };
    if (this._alias) opt.alias = this._alias;
    return opt;
  }
}

export { Command, CommandOption };
