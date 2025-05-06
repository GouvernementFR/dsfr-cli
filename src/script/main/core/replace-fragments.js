export const replaceFragment = (fragment, query) => {
  if (!fragment) return undefined;
  return fragment.replace(/\[(\w+)\]\(%s\)/g, query);
};
