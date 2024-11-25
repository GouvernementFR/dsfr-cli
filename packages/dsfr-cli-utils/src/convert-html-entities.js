const symbols = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&apos;"
}

const convertHTMLEntities = (str) => Object.entries(symbols).forEach(([symbol, entity]) => {
    str = str.replaceAll(symbol, entity)
  });

export { convertHTMLEntities };
