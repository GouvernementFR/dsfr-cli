import { Renderable } from '../../core/renderable.js';

class Resource extends Renderable {
    async render() {
        const resource = {
            meta: this._data.resource.meta,
            search: this._data.resource.search,
            pagination: this._data.resource.pagination,
            consent: this._data.resource.consent
        };
        return `<script>
            window.resource = ${JSON.stringify(resource)};
        </script>`;
    }
}

export { Resource };
