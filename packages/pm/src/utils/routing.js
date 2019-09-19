export const makeRoutePath = path => {
  const basePath = process.env.REACT_APP_BASE_PATH || '';

  if (path === '/') {
    return `${basePath}/`;
  }

  return `${basePath}/${path}/`;
};
