export const makeRoutePath = path => {
  const basePath = process.env.PUBLIC_URL;

  if (path === '/') {
    return `${basePath}/`;
  }

  return `${basePath}/${path}/`;
};
