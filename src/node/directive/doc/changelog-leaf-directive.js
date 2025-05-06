import { Node } from '../../node.js'
import { convertHTMLEntities, gitmoji, log } from '@gouvfr/dsfr-forge'

class ChangelogLeafDirective extends Node {
  structure (data) {
    if (!data.changelog) {
      log.warn('ChangelogLeafDirective: missing "changelog"');
      return data;
    }

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-changelog'],
      children: data.changelog.map(version => this.structureVersion(version, data.dateFormat))
    });
  }

  structureVersion (version, dateFormat) {
    const date = new Intl.DateTimeFormat(dateFormat, {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(version.date));

    return {
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-changelog__version', 'fr-mb-12v'],
      children: [
        {
          type: 'heading',
          depth: 4,
          children: [
            {
              type: 'link',
              url: version.url,
              children: [
                {
                  type: 'text',
                  value: version.id
                }
              ]
            },
            {
              type: 'text',
              value: ` - ${date}`
            }
          ]
        },
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-grid-row', 'fr-grid-row--gutters'],
          children: version.commits.map(commit => this.structureCommit(commit))
        }
      ]
    };
  }

  structureCommit (commit) {
    const contentChildren = [
      {
        type: 'heading',
        depth: 5,
        data: { isSemantic: true },
        classes: ['fr-tile__title'],
        children: [
          {
            type: 'link',
            url: commit.pull,
            children: [
              {
                type: 'text',
                value: convertHTMLEntities(commit.title)
              }
            ]
          }
        ]
      }
    ];

    if (commit.description) {
      commit.description.forEach(node => {
        node.classes = (node.classes ?? []).concat(['fr-tile__desc']);
      });
      contentChildren.push(...commit.description);
    }

    if (commit.change) {
      contentChildren.push({
        type: 'paragraph',
        classes: ['fr-tile__desc'],
        children: [
          {
            type: 'text',
            value: 'Breaking change:'
          }
        ]
      });
      commit.change.forEach(node => {
        node.classes = (node.classes ?? []).concat(['fr-tile__desc']);
      });
      contentChildren.push(...commit.change);
    }

    let badgeClasses = ['fr-badge'];

    switch (commit.type) {
      case 'feat':
        badgeClasses.push('fr-badge--success', 'fr-badge--no-icon');
        break;
      case 'fix':
        badgeClasses.push('fr-badge--warning', 'fr-badge--no-icon');
        break;
      case 'refactor':
        badgeClasses.push('fr-badge--info', 'fr-badge--no-icon');
        break;
      case 'docs':
      case 'doc':
        badgeClasses.push('fr-badge--info', 'fr-badge--no-icon');
        break;
    }

    const badges = [
      {
        type: 'htmlContainer',
        tagName: 'p',
        classes: badgeClasses,
        children: [
          {
            type: 'text',
            value: (commit.gitmojis?.length ? `${commit.gitmojis.join('')} ` : '') + commit.type
          }
        ]
      }
    ]

    if (commit.isBreaking) {
      badges.push({
        type: 'htmlContainer',
        tagName: 'p',
        classes: ['fr-badge', 'fr-badge--error', 'fr-badge--no-icon'],
        children: [
          {
            type: 'text',
            value: `${gitmoji(':boom:')} Breaking change`
          }
        ]
      });
    }

    const badgesGroup = badges.length === 1 ? badges : [
      {
        type: 'htmlContainer',
        tagName: 'div',
        classes: ['fr-badges-group'],
        children: badges
      }
    ]

    contentChildren.push({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['fr-tile__start'],
      children: badgesGroup
    });

    switch (true) {
      case !commit.scopes?.length:
      case commit.scopes.length === 1 && commit.scopes[0] === '*':
        break;

      default:
        contentChildren.push({
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-tile__start'],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['fr-tags-group'],
              children: commit.scopes.map(scope => ({
                type: 'htmlContainer',
                tagName: 'p',
                classes: ['fr-tag'],
                children: [{ type: 'text', value: scope }]
              }))
            }
          ]
        });
    }

    contentChildren.push({
      type: 'paragraph',
      classes: ['fr-tile__detail'],
      children: [
        {
          type: 'text',
          value: `#${commit.id}`
        }
      ]
    });

    return {
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['fr-col-12', 'fr-col-md-8'],
      children: [
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-tile', 'fr-tile--sm', 'fr-enlarge-link', 'fr-tile--horizontal'],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['fr-tile__body'],
              children: [
                {
                  type: 'htmlContainer',
                  tagName: 'div',
                  classes: ['fr-tile__content'],
                  children: contentChildren
                }
              ]
            }
          ]
        }
      ]
    };
  }
}

ChangelogLeafDirective.NAME = 'dsfr-doc-changelog';

export { ChangelogLeafDirective };
