const interpretLink = (link, state, from = '/') => {
  if (link.href === undefined) return;
  if (/^(https:|http:|www\.)\S*$/.test(link.href)) {
    link.blank = true;
    return;
  }

  const regex = /(.*)index(@[a-z]{2})?\.md$/.exec(link.href);
  const href = regex[1]
  if (typeof href !== 'string') return;
  link.href = state.getRelativeUrl(from, href.replace(/\/$/, ''));
  console.log(href, link.href);
}

export { interpretLink };
