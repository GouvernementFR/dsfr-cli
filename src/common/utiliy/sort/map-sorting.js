import { MapSorters, MAP_SORTERS_MAP } from './map-sorters.js';

export const sortMapItems = (items, key = null) => {
  if (key === null) key = MapSorters.SHORT_TITLE.key;
  if (!MAP_SORTERS_MAP.has(key)) throw new Error(`Invalid key ${key} in MapSorting.sort()`);

  const sorting = MAP_SORTERS_MAP.get(key);

  switch (sorting.type) {
    case 'number':
      items.sort((a, b) => sortNumber(a, b, sorting));
      break;

    case 'string':
      items.sort((a, b) => sortString(a, b, sorting));
      break;

    case 'date':
      items.sort((a, b) => sortDate(a, b, sorting));
      break;
  }
};

const sortNumber = (a, b, sorting) => {
  const aValue = a?.$?.sorters?.[sorting.key] ?? sorting.default ?? 0;
  const bValue = b?.$?.sorters?.[sorting.key] ?? sorting.default ?? 0;

  if (sorting.direction === 'asc') {
    return aValue - bValue;
  } else {
    return bValue - aValue;
  }
};

const sortString = (a, b, sorting) => {
  const aValue = a?.$?.sorters?.[sorting.key] || sorting.default || '';
  const bValue = b?.$?.sorters?.[sorting.key] || sorting.default || '';
  const aString = aValue.toString();
  const bString = bValue.toString();
  if (sorting.direction === 'asc') {
    return aString.localeCompare(bString);
  } else {
    return bString.localeCompare(aString);
  }
};

const sortDate = (a, b, sorting) => {
  const aValue = new Date(a?.$?.sorters?.[sorting.key] || sorting.default || '1970-01-01');
  const bValue = new Date(b?.$?.sorters?.[sorting.key] || sorting.default || '1970-01-01');

  if (sorting.direction === 'asc') {
    return aValue - bValue;
  } else {
    return bValue - aValue;
  }
};
