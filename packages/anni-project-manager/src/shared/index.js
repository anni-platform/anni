import localForage from 'localforage';

const NAMESPACE = 'anni-pma-';
const prefixKey = key => `${NAMESPACE}${key}`;
export const PROJECTS_STORE_KEY = prefixKey('projects');
const DEFAULT_PROJECTS_STORE = [];

export const getProjects = async () => {
  try {
    const store = await localForage.getItem(PROJECTS_STORE_KEY);
    if (!store) {
      await localForage.setItem(PROJECTS_STORE_KEY, DEFAULT_PROJECTS_STORE);
      return DEFAULT_PROJECTS_STORE;
    }
    return store;
  } catch (e) {}
};

export function saveProjects(projects) {
  if (projects) {
    return localForage.setItem(PROJECTS_STORE_KEY, projects);
  }
}

export * from './project';
