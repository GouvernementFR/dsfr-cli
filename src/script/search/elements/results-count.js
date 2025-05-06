import { replaceFragment } from '../../main/core/replace-fragments.js';
import { getQuery } from '../../main/core/get-query.js';

class ResultsCount {
    constructor(count) {
        this._resourceSearch = window.resource?.search;
        this._query = getQuery();
        this._resultsCount = count
            ? `${count} ${count > 1 ? this._resourceSearch?.results?.count?.start?.plural : this._resourceSearch?.results?.count?.start?.single} ${replaceFragment(this._resourceSearch?.results?.count?.end, this._query)}`
            : replaceFragment(
                  this._resourceSearch?.noresults?.title,
                  this._query
              );
    }

    render() {
        return this._resultsCount;
    }
}

export { ResultsCount };
