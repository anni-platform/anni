import { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import localForage from 'localforage';
import PropTypes from 'prop-types';
import slugify from '@sindresorhus/slugify';
import { useDropboxClient } from '.';

export const TYPE_IMAGE_COLLECTION = 'imageCollection';
export const TYPE_PROSE = 'prose';
export const TYPE_MOTION = 'motion';

export const SUBTYPE_MOOD_BOARD = 'moodBoard';
export const SUBTYPE_STORY_BOARD = 'storyBoard';
export const SUBTYPE_STYLE_FRAMES = 'styleFrames';

export const SECTION_TYPES = [TYPE_IMAGE_COLLECTION, TYPE_PROSE, TYPE_MOTION];
export const SECTION_SUB_TYPES = [
  SUBTYPE_MOOD_BOARD,
  SUBTYPE_STORY_BOARD,
  SUBTYPE_STYLE_FRAMES,
];
export const SECTION_CONFIG = {
  [TYPE_PROSE]: TYPE_PROSE,
  [TYPE_MOTION]: TYPE_MOTION,
  [TYPE_IMAGE_COLLECTION]: [
    SUBTYPE_MOOD_BOARD,
    SUBTYPE_STORY_BOARD,
    SUBTYPE_STYLE_FRAMES,
  ],
};

export const DEFAULT_PROSE_NAME = 'Script';
export const DEFAULT_IMAGE_COLLECTION_NAME = 'Image collection';
export const DEFAULT_MOOD_BOARD_NAME = 'Mood board';
export const DEFAULT_STORY_BOARD_NAME = 'Story board';
export const DEFAULT_STYLE_FRAMES_NAME = 'Style frames';
export const DEFAULT_MOTION_NAME = 'Animation';

export const SECTION_TYPE_NAMES = {
  [TYPE_IMAGE_COLLECTION]: DEFAULT_IMAGE_COLLECTION_NAME,
  [TYPE_PROSE]: DEFAULT_PROSE_NAME,
  [TYPE_MOTION]: DEFAULT_MOTION_NAME,
};

export const SECTION_SUB_TYPE_NAMES = {
  [SUBTYPE_MOOD_BOARD]: DEFAULT_MOOD_BOARD_NAME,
  [SUBTYPE_STORY_BOARD]: DEFAULT_STORY_BOARD_NAME,
  [SUBTYPE_STYLE_FRAMES]: DEFAULT_STYLE_FRAMES_NAME,
};

export const projectSectionTypes = PropTypes.oneOf(SECTION_TYPES);
export const projectSectionSubTypes = PropTypes.oneOf(SECTION_SUB_TYPES);

export const projectSectionShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  type: projectSectionTypes.isRequired,
  subtype: projectSectionSubTypes,
});

export const projectShape = PropTypes.shape({
  name: PropTypes.string,
  sections: PropTypes.arrayOf(projectSectionShape),
});

export const projectMessages = {
  overviewLink: 'Overview',
};

export const PROJECT_SECTIONS_DEFAULT = [
  {
    id: slugify(DEFAULT_PROSE_NAME),
    name: DEFAULT_PROSE_NAME,
    type: TYPE_PROSE,
  },
  {
    id: slugify(DEFAULT_MOOD_BOARD_NAME),
    name: DEFAULT_MOOD_BOARD_NAME,
    type: TYPE_IMAGE_COLLECTION,
    subtype: SUBTYPE_MOOD_BOARD,
  },
  {
    id: slugify(DEFAULT_STORY_BOARD_NAME),
    name: DEFAULT_STORY_BOARD_NAME,
    type: TYPE_IMAGE_COLLECTION,
    subtype: SUBTYPE_STORY_BOARD,
  },
  {
    id: slugify(DEFAULT_STYLE_FRAMES_NAME),
    name: DEFAULT_STYLE_FRAMES_NAME,
    type: TYPE_IMAGE_COLLECTION,
    subtype: SUBTYPE_STYLE_FRAMES,
  },
  {
    id: slugify(DEFAULT_MOTION_NAME),
    name: DEFAULT_MOTION_NAME,
    type: TYPE_MOTION,
  },
];

export function createProjectWithDefaults(name) {
  return {
    id: slugify(name),
    name,
    sections: PROJECT_SECTIONS_DEFAULT,
  };
}

const NAMESPACE = 'anni-pma-';
const prefixKey = key => `${NAMESPACE}${key}`;
const PROJECTS_STORE_KEY = prefixKey('projects');
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

function updateProjectById(projects, projectUpdate) {
  return projects.map(project => {
    if (project.id === projectUpdate.id) {
      return {
        ...project,
        ...projectUpdate,
      };
    }
    return project;
  });
}

let lastProjectsState;

export function useProjectManager(defaultProjects) {
  const { updateDatabase } = useDropboxClient();
  const [projects, setProjects] = useState(defaultProjects);

  function updateProject(projectUpdate) {
    setProjects(updateProjectById(projectUpdate));
  }

  useEffect(() => {
    if (!isEqual(lastProjectsState, projects)) {
      saveProjects(projects);
      updateDatabase({ data: { projects } });
      lastProjectsState = projects;
    }
  });

  return {
    updateProject,
  };
}
