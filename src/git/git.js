import { cmd } from '../helpers/cmd.js';
import { gitmoji, isBreakingGitmoji } from './gitmoji.js'
import { Github } from './github.js';
import { log } from '../helpers/index.js';

/*
 An HTTPS URL like https://github.com/user/repo.git
 An SSH URL, like git@github.com:user/repo.git
 */
const GITHUB_REGEX = /(?:(?:http|https):\/\/github.com\/|git@github.com:)(?<owner>[^/]+)\/(?<repository>[^/]+)\.git/;

const TAG_PATTERN = 'v\\d+\\.\\d+\\.\\d+(?:-.+)?';

const TAG_REGEX = new RegExp(`^${TAG_PATTERN}$`);

const DETAILS_REGEX = new RegExp(`tag: refs\\/tags\\/(?<tag>${TAG_PATTERN})`);

/*
 Regex du message de commit non ventilée:
 /^(?<gm1>(?:(?::\w+:|[\u{2600}-\u{1FAFF}]+)\s*)*)(?<type>feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(?:\((?<scope>.*)\))?\s*:\s+(?<gm2>(?:(?::\w+:|[\u{2600}-\u{1FAFF}]+)\s*)*)\s*(?<title>[^[#]*)\s*(?:\[(?<jira>DS-\d+)\])*\s*\((?<id>#\d*)\)\s*$/u
 */

const GITMOJI_PATTERN = '(?::\\w+:|[\\u{2600}-\\u{1FAFF}]+)';
const gitmojiCapture = id => `(?<gm${id}>(?:${GITMOJI_PATTERN}\\s)*)`;
const TYPE_PATTERN = 'feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert' + '|doc|Feat|Fix|Refactor';
const TYPE_CAPTURE = `(?<type>${TYPE_PATTERN})`;
const SCOPE_CAPTURE = '(?:\\((?<scope>.*)\\))?';
const BREAKING_CAPTURE = '(?<breaking>!)?';
const TITLE_CAPTURE = '(?<title>(?:(?!\\s*\\(#|\\s*\\[DS(?:FR)?-|\\s*\\[\\d+).)+)';
const TICKET_CAPTURE = '(?:\\[(?<ticket>(?:(?:(?:DS(?:FR)?-)?\\d+)(?:\\s*(?:,|\\]\\s*\\[)\\s*)?)+)\\])*';
const ID_CAPTURE = '(?:\\(*(?:fix\\s)?#(?<id>\\d*)\\)*\\s*)+';

const SUBJECT_REGEX = new RegExp(`^${gitmojiCapture(1)}\\s*${TYPE_CAPTURE}\\s*${SCOPE_CAPTURE}\\s*${BREAKING_CAPTURE}\\s*:\\s+${gitmojiCapture(2)}\\s*${TITLE_CAPTURE}\\s*${TICKET_CAPTURE}\\s*${ID_CAPTURE}\\s*$`, 'u');

const BODY_REGEX = new RegExp(`^(?<description>.+?)(?:\\s*-\\s*)?(?:BREAKING CHANGE\\s*:?\\s*(?<change>.+))?$`, 's');


class Git {
  constructor () {}
  async load () {
    const remoteURL = (await cmd ('git config --get remote.origin.url')).toString();

    switch (true) {
      case GITHUB_REGEX.test(remoteURL):
        const { groups: { owner, repository } } = remoteURL.match(GITHUB_REGEX);
        this._provider = new Github(owner, repository);
        break;
    }
  }

  async loadTags () {
    if (this._tags) return this._tags;
    const list = await cmd('git tag -l --format=%(refname:short)␞%(creatordate:short)');
    this._tags = list.trim()
      .split('\n')
      .map(line => line.trim().split('␞'))
      .map(([id, date]) => ({ id, date }))
      .filter(tag => TAG_REGEX.test(tag.id));
  }

  async loadCommits () {
    const list = await cmd('git log --format=%s␞%d␞%b\u001d --decorate=full');
    let tag = 'HEAD';
    this._commits = list
      .trim()
      .split('\u001d\n')
      .map(commit => {
        const [subject, details, body] = commit.replace('\u001d','').split('␞');
        tag = details.match(DETAILS_REGEX)?.groups?.tag ?? tag;
        const groups = subject.match(SUBJECT_REGEX)?.groups;
        if (!groups) {
          if (/#\d+/.test(subject)) log.warn(`remove commit "${subject}"`);
          return null;
        }
        const { gm1, gm2, type, scope, breaking, title, ticket, id } = subject.match(SUBJECT_REGEX)?.groups;
        const gitmojis = gitmoji(`${gm1??''}${gm2??''}`.trim()).split(' ').filter(gm => gm !== '');
        const scopes = scope?.split(',').map(s => s.trim()) ?? [];
        const tickets = ticket?.trim()?.split(',')?.map(t => t.trim());
        const { description, change } = body.match(BODY_REGEX)?.groups ?? { description: body };
        const isBreaking = gitmojis.some(g => isBreakingGitmoji(g)) || breaking !== undefined || change !== undefined;
        return { id, type, scopes, description, isBreaking, change, tickets, gitmojis, tag, title, pull: this._provider.pull(id) };
      })
      .filter(commit => commit !== null);
  }

  get tags () {
    return this._tags;
  }

  get commits () {
    return this._commits;
  }

  get provider () {
    return this._provider;
  }
}

export { Git };
