export const formatLink = (link) => {
  if (!link) return undefined;
  const url = link.url ?? link.href;
  if (/^(https:|http:|www\.)\S*$/.test(url)) link.blank = true;
  link.href = url;
  link.label = link.label ?? link.text;
  return link;
};
