export const MapSorters = {
  ORDER: {
    key: 'order',
    type: 'number',
    direction: 'asc',
    default: 100000,
  },
  SHORT_TITLE: {
    key: 'shortTitle',
    type: 'string',
    direction: 'asc'
  },
  PRIORITY: {
    key: 'priority',
    type: 'number',
    direction: 'desc',
    default: 0,
  },
  PUBLISHED: {
    key: 'published',
    type: 'date',
    direction: 'desc',
    default: '1970-01-01',
  },
};

export const MAP_SORTERS_MAP = new Map([...Object.values(MapSorters).map(type => [type.key, type])]);

export const MAP_SORTERS_KEYS = Object.values(MapSorters).map(({key}) => key);
