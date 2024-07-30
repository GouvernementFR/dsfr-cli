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
      yargs = yargs.option(option.name, option.data);
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
    this.key = key;
    this.describe = describe;
    this.type = type;
    this.alias = alias;
  }

  get options () {
    const options = {
      describe: this.describe,
      type: this.type
    };
    if (this.alias) options.alias = this.alias;
    return options;
  }
}

export { Command, CommandOption };
