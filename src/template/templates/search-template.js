import { Template } from '../template.js';

class SearchTemplate extends Template {
    constructor(data) {
        super(data);
    }

    async render() {
        return `
            <div class="fr-container">
              <div id="results-page" class="dsfr-doc-search-page">
                <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
                  <div id="results-page--container" class="fr-col-12 fr-col-md-8">
                    <section class="dsfr-doc-search-page--head fr-mt-17v">
                      <h1>${this.data.title}</h1>
                      <p id="results-count" class="fr-h5" role="status"></p>
                    </section>
                  </div>
                </div>
              </div>
            </div>`;
    }
}

SearchTemplate.NAME = 'search';

export { SearchTemplate };
