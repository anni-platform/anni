import React from 'react';
import PropTypes from 'prop-types';
import {
  projectSectionTypes,
  projectSectionSubTypes,
  projectShape,
} from 'shared';
import { PROJECT_SECTION } from 'test/ids';

export default function ProjectSection({ name, project, subtype, type }) {
  return (
    <div data-testid={PROJECT_SECTION}>
      <h1>
        {project.name} - {name}
      </h1>
      {type}
      {subtype && ` - ${subtype}`}
    </div>
  );
}

ProjectSection.propTypes = {
  name: PropTypes.string,
  project: projectShape,
  subtype: projectSectionSubTypes,
  type: projectSectionTypes,
};
