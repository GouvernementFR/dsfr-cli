import { Element } from '../../core/element.js';
import { ResultsDropdown } from './results/results-dropdown.js';

class SearchBar extends Element {
  constructor (element) {
    super(element, 'searchBar');
    this._searchInput = this.element.querySelector('#search-input');
    this._searchButton = this.element.querySelector('#search-button');
    this._query = this._searchInput.value;
  }

  async init () {
    this._url = this._searchButton.getAttribute('data-href');

    this._resultsDropdown = new ResultsDropdown(this._url);
    this.element.appendChild(this._resultsDropdown.element);
    await this._resultsDropdown.init();

    document.addEventListener('click', this.handleDocumentClick.bind(this));

    this._searchInput.addEventListener(
      'focus',
      this.handleInputFocus.bind(this)
    );

    this._searchInput.addEventListener(
      'keyup',
      this.handleKeyup.bind(this)
    );

    // Handle search input clear
    this._searchInput.addEventListener(
      'search',
      this.handleKeyup.bind(this)
    );
  }

  update (query) {
    this._query = query;
    this._searchButton.setAttribute('href', `${this._url}?query=${query}`);
    this._resultsDropdown.update(query);
  }

  handleDocumentClick (event) {
    const outsideClick = !this.element.contains(event.target);
    if (outsideClick) {
      this._resultsDropdown.reset();
    }
  }

  handleKeyup (event) {
    if (event.key === 'Enter') {
      document.location.href = this._searchButton.getAttribute('href');
    } else {
      this.update(event.target.value);
    }
  }

  handleInputFocus () {
    this.update(this._query);
  }
}

export { SearchBar };
