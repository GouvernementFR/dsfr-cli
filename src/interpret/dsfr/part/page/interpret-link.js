const interpretLink = (link, state, from = '/') => {
  if (link.href === undefined) return;
  if (/^(https:|http:|www\.)\S*$/.test(link.href)) {
    link.blank = true;
    return;
  }

  const regex = /(.*)index(@[a-z]{2})?\.md$/.exec(link.href);
  if (!regex) return;
  link.href = state.getRelativeUrl(from, regex[1].replace(/\/$/, ''));
}

export { interpretLink };
