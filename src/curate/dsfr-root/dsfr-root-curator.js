
class DsfrRootCurator {
  async curate (settings) {
    /*
    const state = await this.getState(settings.isCurrent !== false);
    deleteDir(CONFIG_DIR);
    this._rootPart = new PartParser(state, null);

    await this._rootPart.read();
    await this._rootPart.write();

    const partIds = this._rootPart.descendants.map(part => part.id);
    partIds.unshift(this._rootPart.id);

    await state.write(this._rootPart.map, partIds);

    const redirectionParser = new RedirectionParser(state, this._rootPart.map);
    await redirectionParser.read();
    await redirectionParser.write();

    const changelogParser = new ChangelogParser(state, partIds);
    await changelogParser.read();
    await changelogParser.write();

     */
  }

  async getState (isCurrent) {
    /*
    const state = await getState({ src: 'src/dsfr', dest: '.'}, StateParser);
    if (isCurrent) return state.setAsCurrent();
    return state;

     */
  }
}

export { DsfrRootCurator };
