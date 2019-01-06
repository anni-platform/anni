import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { Router, Link } from '@reach/router';
import { PROJECT_SECTION_NAV } from 'test/ids';
import { projectMessages } from 'shared';
import NotFound from 'NotFound';
import ProjectSection from 'project/ProjectSection';
import ProjectOverview from 'project/ProjectOverview';
import ProjectSettings from 'project/ProjectSettings';

const getProjectbyId = createSelector(
  props => props.projects,
  props => props.projectId,
  (projects, projectId) => projects.find(({ id }) => id === projectId)
);

export default function Project(props) {
  const [isEditingSections, setEditingSections] = useState(false);
  const project = getProjectbyId(props);
  const { updateProject } = props;

  if (!project) return <NotFound />;

  const projectNavigation = (
    <ul data-testid={PROJECT_SECTION_NAV}>
      <li>
        <Link to="./">{projectMessages.overviewLink}</Link>
      </li>
      {project.sections.map(({ id, name }, index) => (
        <li key={id}>
          <Link to={id}>{name}</Link>
        </li>
      ))}
      <li>
        <button onClick={() => setEditingSections(true)}>
          Edit project sections
        </button>
      </li>
    </ul>
  );

  const projectSettings = (
    <ProjectSettings
      project={project}
      toggleEditing={() => setEditingSections(false)}
      updateProject={updateProject}
    />
  );

  return (
    <div>
      <Router>
        <ProjectOverview default project={project} />
        {project.sections.map((section, index) => (
          <ProjectSection
            key={section.id}
            path={section.id}
            project={project}
            {...section}
          />
        ))}
      </Router>

      {isEditingSections ? projectSettings : projectNavigation}
    </div>
  );
}

Project.propTypes = {
  updateProject: PropTypes.func,
};

Project.defaultProps = {
  updateProject: () => null,
};
