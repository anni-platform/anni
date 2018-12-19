import React from 'react';
import { createSelector } from 'reselect';
import { Router, Link } from '@reach/router';
import { PROJECT_SECTION, PROJECT_SECTION_NAV } from 'test/ids';
import NotFound from './NotFound';

const messages = {
  overviewLink: 'Overview',
};

const getProjectbyId = createSelector(
  props => props.projects,
  props => props.projectId,
  (projects, projectId) => projects.find(({ id }) => id === projectId)
);

const ProjectOverview = ({ project }) => (
  <div data-testid={PROJECT_SECTION}>
    <h1>{project.name}</h1>
    <p>{project.details}</p>
  </div>
);

const ProjectSection = ({ name, project, subtype, type }) => (
  <div data-testid={PROJECT_SECTION}>
    <h1>
      {project.name} - {name}
    </h1>
    {type}
    {subtype && ` - ${subtype}`}
  </div>
);

export default function Project(props) {
  const project = getProjectbyId(props);

  if (project) {
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

        <ul data-testid={PROJECT_SECTION_NAV}>
          <li>
            <Link to="./">{messages.overviewLink}</Link>
          </li>
          {project.sections.map(({ id, name }, index) => (
            <li key={id}>
              <Link to={id}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <NotFound />;
}
