import fs from 'fs';
import yaml from 'yaml';
import { DirectiveNode } from './directive-node.js';

/**
 * List of fields that are considered as assets.
 * @type {string[]}
 */
const ASSET_FIELDS = [];

const DEFAULT_FIELDS = ['cover', 'shortDescription'];

/**
 * @class PageItemListLeafDirectiveNode
 * @extends DirectiveNode
 * * @attributes {
 * path (string) - The path to resolve items, by default the current path,
 * depth (number) - The depth to which to collect children pages,
 * rank (number|null) - The rank to filter items by (null for all, part for children parts),
 * fields (string) - Comma-separated fields to include in the item data }
 */

class PageItemListLeafDirectiveNode extends DirectiveNode {
  constructor (data, state) {
    super(data, state);

    this._assets = [];
    this._depth = parseInt(data?.properties?.depth) || 1;
    const lengths = data?.properties?.lengths?.split(',')?.map(length => parseInt(length)) || [];
    const names = data?.properties?.itemDirectiveName?.split(',') || [];
    const path = data?.properties?.path ?? state.path;
    const fields = data?.properties?.fields?.split(',') ?? DEFAULT_FIELDS;
    this._items = this.getItems(path, data?.properties?.rank, data?.properties?.sort, fields, this._depth - 1, lengths, names);
  }

  getItems (path, rank = null, sort = null, fields = [], recursive = 0, lengths = [], names = []) {
    const itemsData = this._state.resolveItems(path, rank, sort);

    if (!itemsData || itemsData.length === 0) return [];

    if (lengths.length > 0) {
      const length = lengths.shift();
      if (itemsData.length > length) {
        itemsData.length = length;
      }
    }

    if (names.length > 0) {
      const name = names.shift();
      itemsData.forEach(item => item.name = name);
    }

    return itemsData.map((data) => this.getItem(data, rank, sort, fields, recursive, [...lengths], [...names])) || [];
  }

  getItem (data, rank = null, sort = null, fields = [], recursive = 0, lengths = [], names = []) {
    const item = {
      url: data.url,
      text: data.text,
      isCurrent: data.isCurrent === true
    };

    if (data.name) item.name = data.name;

    if (fields.length) {
      const ymlFile = fs.readFileSync(data.config, 'utf8');
      const yml = yaml.parse(ymlFile);

      for (const field of fields) {
        const value = yml[field];

        switch (true) {
          case value === undefined:
            break;

          case ASSET_FIELDS.includes(field):
            item[field] = this.addAsset(value, { src: yml.src, deploy: yml.deploy, path: yml.path} );
            break;

          default:
            item[field] = value;
        }
      }
    }

    if (recursive > 0) {
      item.items = this.getItems(data.path, rank, sort, fields, recursive - 1, lengths, names);
    }

    return item;
  }

  get items () {
    return this._items;
  }

  get depth () {
    return this._depth;
  }

  get data () {
    return {
      type: this.type,
      items: this.items,
      depth: this.depth,
      name: PageItemListLeafDirectiveNode.NAME,
    };
  }
}

PageItemListLeafDirectiveNode.NAME = 'dsfr-doc-page-item-list';

export { PageItemListLeafDirectiveNode };
