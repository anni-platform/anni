import PropTypes from 'prop-types';
import slugify from '@sindresorhus/slugify';

export const TYPE_IMAGE_COLLECTION = 'imageCollection';
export const TYPE_PROSE = 'prose';
export const TYPE_MOTION = 'motion';

export const SUBTYPE_MOOD_BOARD = 'moodBoard';
export const SUBTYPE_STORY_BOARD = 'storyBoard';
export const SUBTYPE_STYLE_FRAMES = 'styleFrames';

export const DEFAULT_PROSE_NAME = 'Script';
export const DEFAULT_MOOD_BOARD_NAME = 'Mood board';
export const DEFAULT_STORY_BOARD_NAME = 'Story board';
export const DEFAULT_STYLE_FRAMES_NAME = 'Style frames';
export const DEFAULT_MOTION_NAME = 'Animation';

export const projectSectionTypes = PropTypes.oneOf([
  TYPE_IMAGE_COLLECTION,
  TYPE_PROSE,
  TYPE_MOTION,
]);

export const projectSectionSubTypes = PropTypes.oneOf([
  SUBTYPE_MOOD_BOARD,
  SUBTYPE_STORY_BOARD,
  SUBTYPE_STYLE_FRAMES,
]);

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
