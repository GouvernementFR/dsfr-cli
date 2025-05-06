const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);

const getQuery = () => {
    return searchParams.get('query');
};

const getCurrentPagination = () => {
  return parseInt(searchParams.get('page'));
};

export { getQuery, getCurrentPagination };
