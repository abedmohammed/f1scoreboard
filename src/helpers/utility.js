const API = (path) => {
  return `http://ergast.com/api${path}.json`;
};

const getUrl = (link) => {
  return decodeURI(link.substring(link.lastIndexOf("/") + 1));
};

export { API, getUrl };
