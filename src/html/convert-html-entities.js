const symbolMap = new Map([
  ['&', '&amp;'],
  ['<', '&lt;'],
  ['>', '&gt;'],
  ['"', '&quot;'],
  ['\'', '&apos;']
]);

const convertHTMLEntities = (str) => {
  if (!str) return '';
  symbolMap.forEach((entity, symbol) => {
    str = str.replaceAll(symbol, entity)
  });
  return str;
}

export { convertHTMLEntities };
