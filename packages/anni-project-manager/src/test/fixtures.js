import { PROJECT_SECTIONS_DEFAULT } from 'shared';

export const projects = 'abce'.split('').map(p => ({
  id: `project-${p}`,
  name: `Project ${p.toUpperCase()}`,
  details: `Details about project ${p.toUpperCase()}`,
  sections: PROJECT_SECTIONS_DEFAULT,
}));
