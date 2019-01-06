import React, { useState } from 'react';
import { Link } from '@reach/router';
import { makeRoutePath } from 'utils/routing';
import { createProjectWithDefaults } from 'shared';

export const messages = {
  projectNameLabel: 'Project name',
  projectNamePlaceholder: 'Project B',
  noProjects: 'No projects',
  createProject: 'Create project',
  removeProject: 'Remove project',
  removeProjectAriaLabel: 'Remove {name} project',
  errorProjectNameTaken: 'Sorry, that project name is already taken.',
};

export const generateRemoveButtonAriaLabel = name =>
  messages.removeProjectAriaLabel.replace(/\{.*?\}/, name);

function ProjectCard({ id, name, removeProject }) {
  return (
    <div>
      <h3>
        <Link to={makeRoutePath(id)}>{name}</Link>
      </h3>
      <button
        aria-label={generateRemoveButtonAriaLabel(name)}
        onClick={() => removeProject(name)}
      >
        {messages.removeProject}
      </button>
    </div>
  );
}

const projectNameErrorId = 'projectNameErrorId';
function ProjectForm({ addProject, validateProject }) {
  const [value, setValue] = useState('');
  const [projectNameError, setProjectNameError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    const projectData = createProjectWithDefaults(value);
    const validationResult = validateProject(projectData);
    if (validationResult === null) {
      addProject(projectData);
      setValue('');
    } else {
      setProjectNameError(validationResult);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="projectName">
        {messages.projectNameLabel}
        <input
          aria-describedby={projectNameError && projectNameErrorId}
          aria-invalid={!!projectNameError ? true : null}
          id="projectName"
          type="text"
          className="input"
          placeholder={messages.projectNamePlaceholder}
          value={value}
          onChange={e => {
            setProjectNameError(null);
            setValue(e.target.value);
          }}
        />
      </label>
      {projectNameError && (
        <p style={{ color: 'magenta' }} id={projectNameErrorId}>
          {projectNameError.message}
        </p>
      )}
      <button type="submit">{messages.createProject}</button>
    </form>
  );
}

export default function Dashboard({ projects, setProjects }) {
  const addProject = project => setProjects([...projects, project]);
  const removeProject = name =>
    setProjects(projects.filter(project => project.name !== name));

  function validateProject({ name }) {
    if (projects.find(p => p.name === name)) {
      return {
        message: messages.errorProjectNameTaken,
      };
    }
    return null;
  }

  return (
    <div>
      <h2>Projects</h2>
      {projects.length === 0 && <p>{messages.noProjects}</p>}
      {projects.map(project => (
        <ProjectCard
          {...project}
          key={project.name}
          removeProject={removeProject}
        />
      ))}
      <ProjectForm addProject={addProject} validateProject={validateProject} />
    </div>
  );
}
