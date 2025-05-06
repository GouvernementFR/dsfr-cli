import fs from 'fs';
import { DirectiveNode } from './directive-node.js';
import yaml from 'yaml'
import { parseMarkdown } from '../../parse/parse-markdown.js'
import { parseNodes } from '../../parse/parse-nodes.js'
import { pageNodeFactory } from '../page-node-factory.js';

class ChangelogLeafDirectiveNode extends DirectiveNode {
  constructor (data, state) {
    super(data, state);
    if (fs.existsSync(state.configFile('changelog.yml'))) {
      const changelogData = fs.readFileSync(state.configFile('changelog.yml'), 'utf8');
      if (changelogData) {
        const changelog = yaml.parse(changelogData);
        changelog.map(version => version.commits = version.commits.map(commit => {
          if (commit.hasOwnProperty('description')) {
            const mdast = parseMarkdown(commit.description);
            const nodes = parseNodes(mdast.children);
            commit.description = nodes.map(node => pageNodeFactory(node, state)).map(node => node.data);
          }
          if (commit.hasOwnProperty('change')) {
            const mdast = parseMarkdown(commit.change);
            const nodes = parseNodes(mdast.children);
            commit.change = nodes.map(node => pageNodeFactory(node, state)).map(node => node.data);
          }
          return commit;
        }));
        this._changelog = changelog;
      }
    }
  }

  get changelog () {
    return this._changelog;
  }

  get data () {
    return {
      ...super.data,
      changelog: this.changelog,
      dateFormat: this._state.i18n.current.code
    };
  }

}

ChangelogLeafDirectiveNode.NAME = 'dsfr-doc-changelog';

export { ChangelogLeafDirectiveNode };
