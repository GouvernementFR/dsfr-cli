class ResultCard {
    constructor(data) {
        this._title = data.title;
        this._url = data.url;
        this._desc = data.excerpt ?? data.summary;
        this._cover = data.cover || '/static/img/placeholder.16x9.png';
        this._section = data.section;
    }

    getTags() {
        if (!this._section) return '';
        return `<div class="fr-card__start">
                    <ul class="fr-tags-group">
                        <li>
                            <p class="fr-tag">${this._section}</p>
                        </li>
                    </ul>
                </div>`;
    }

    getCover() {
        if (!this._cover) return '';
        return `<div class="fr-card__header">
                    <div class="fr-card__img">
                        <img src="${this._cover}" alt="" class="fr-responsive-img">
                    </div>
                </div>`;
    }

    render() {
        return `<div class="fr-card fr-enlarge-link fr-card--horizontal fr-mb-8v">
                    <div class="fr-card__body">
                        <div class="fr-card__content">
                            <h3 class="fr-card__title">
                                <a href="${this._url}">${this._title}</a>
                            </h3>
                            ${this._desc ? `<p class="fr-card__desc">${this._desc}</p>` : ''}
                            ${this.getTags()}
                        </div>
                    </div>
                    ${this.getCover()}
                </div>`;
    }
}

export { ResultCard };
