import { Component } from '../component.js';

class Skiplink extends Component {
    constructor(data) {
        super(data, 'skiplink');
    }

    get ejsPath() {
        return 'src/dsfr/component/skiplink/template/ejs/skiplinks.ejs';
    }

    async format() {
        return {
            id: 'skiplink',
            items: [
                {
                    attributes: {
                        id: 'skiplink-content',
                    },
                    label: this.data.resource.skiplink.content,
                    href: '#content',
                },
                {
                    attributes: {
                        id: 'skiplink-navigation',
                    },
                    label: this.data.resource.skiplink.navigation,
                    href: '#menu-modal',
                },
                {
                    attributes: {
                        id: 'skiplink-search',
                    },
                    label: this.data.resource.skiplink.search,
                    href: '#search-modal',
                },
                {
                    attributes: {
                        id: 'skiplink-footer',
                    },
                    label: this.data.resource.skiplink.footer,
                    href: '#footer',
                },
            ],
        };
    }
}

export { Skiplink };
