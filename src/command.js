class Command {
  constructor(cmd, description) {
    this.cmd = cmd;
    this.description = description;
  }

  get usage () {
    return '';
  }

  get description () {
    return '';
  }

  get options () {
    return [];
  }

  builder (yargs) {
    let result = yargs
      .usage(`Usage: $0 ${this.usage}`)
      .example(`$0 ${this.usage}`, this.description)
    for (let option of this.options) {
      result = result.option(option.name, option.data);
    }
    return result;
  }

  async handler (argv) {}
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
