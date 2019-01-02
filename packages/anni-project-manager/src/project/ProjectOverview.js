import React from 'react';
import { PROJECT_SECTION } from 'test/ids';
import { projectShape } from 'constants/project';

export default function ProjectOverview({ project }) {
  return (
    <div data-testid={PROJECT_SECTION}>
      <h1>{project.name}</h1>
      <p>{project.details}</p>
    </div>
  );
}

ProjectOverview.propTypes = {
  project: projectShape,
};
