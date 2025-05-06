import { Node } from '../../node.js';
import { HtmlNode } from '../../generic/html-node.js';

class TabNavigationContainerDirective extends Node {
    constructor(data) {
        super(data);
        this._id = data.properties.id || 'dsfr-doc-tab-navigation--collapse';
        const list = this.findDescendantsByType('list')[0];
        list.attributes.setAttribute('role', 'tablist');
        const items = list.findDescendantsByType('listItem');
        for (const item of items) {
            item.attributes.setAttribute('role', 'presentation');
            let node;
            let isSelected = false;
            const link = item.findDescendantsByType('link')[0];
            if (link) {
                node = link;
            } else {
                this._currentNode = item._children[0];

                node = new HtmlNode({ type: 'html', value: '<div>' });
                const close = new HtmlNode({ type: 'html', value: '</div>' });
                item._children = [node, ...item._children, close];
                isSelected = true;
            }
            node.attributes.setAttribute('role', 'tab');
            node.attributes.setAttribute('aria-selected', isSelected);
            node.attributes.addClass('dsfr-doc-tab-navigation__tab');
        }
    }
    async render() {
        this.attributes.setAttribute('role', 'navigation');
        this.attributes.addClass('dsfr-doc-tab-navigation');
        return `<nav ${this.renderAttributes()}>
        <div class="fr-sidemenu">
            <div class="fr-sidemenu__inner">
                <button aria-expanded="false" aria-controls="${this._id}" type="button" class="fr-sidemenu__btn">${await this._currentNode.render()}</button>
                <div class="fr-collapse" id="${this._id}">
                    ${await super.render()}
                </div>
            </div>
        </div>
    </nav>`;
    }
}

TabNavigationContainerDirective.NAME = 'dsfr-doc-tab-navigation';

export { TabNavigationContainerDirective };
