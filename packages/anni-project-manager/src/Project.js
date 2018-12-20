import React, { useState } from 'react';
import { createSelector } from 'reselect';
import { Router, Link } from '@reach/router';
import slugify from '@sindresorhus/slugify';
import { PROJECT_SECTION, PROJECT_SECTION_NAV } from 'test/ids';
import SortableList from 'components/SortableList';
import NotFound from './NotFound';

const SETTINGS_PATH = 'settings';

const messages = {
  overviewLink: 'Overview',
  settings: 'Settings',
  newProjectSectionNameLabel: 'Add a new project section',
  newProjectSectionNamePlaceholder: 'Section name',
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

function ProjectSectionForm({ saveNewSection }) {
  const [name, setName] = useState('');
  function onSubmit(e) {
    e.preventDefault();
    saveNewSection({ name, id: slugify(name) });
  }
  return (
    <form onSubmit={onSubmit}>
      <label>
        {messages.newProjectSectionNameLabel}
        <input
          value={name}
          onChange={({ target }) => setName(target.value)}
          name="newProjectSectionName"
          placeholder={messages.newProjectSectionNamePlaceholder}
        />
      </label>
    </form>
  );
}

const ProjectSettings = ({ project, updateProject }) => (
  <div>
    <h1>
      {project.name} - {messages.settings}
    </h1>
    <SortableList
      defaultItems={project.sections}
      onReorder={sections => updateProject({ ...project, sections })}
      renderItem={({ name }) => <strong>{name}</strong>}
    />
    <ProjectSectionForm
      saveNewSection={newSection => {
        console.log(newSection);
        updateProject({
          id: project.id,
          sections: [...project.sections, newSection],
        });
      }}
    />
  </div>
);

export default function Project(props) {
  const project = getProjectbyId(props);
  const { updateProject } = props;

  if (project) {
    return (
      <div>
        <Router>
          <ProjectSettings
            path={SETTINGS_PATH}
            project={project}
            updateProject={updateProject}
          />
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
          <li>
            <Link to={SETTINGS_PATH}>{messages.settings}</Link>
          </li>
        </ul>
      </div>
    );
  }
  return <NotFound />;
}
