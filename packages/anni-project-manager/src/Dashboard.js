import React, {useState} from 'react';

export const messages = {
  projectNameLabel: 'Project name',
  projectNamePlaceholder: 'Project B',
  noProjects: 'No projects',
  createProject: 'Create project',
  removeProject: 'Remove Project',
};

function ProjectCard({name, removeProject}) {
  return (
    <div>
      <h3>{name}</h3>
      <button onClick={() => removeProject(name)}>
        {messages.removeProject}
      </button>
    </div>
  );
}

function ProjectForm({addProject}) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addProject({
      name: value,
    });
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="projectName">
        {messages.projectNameLabel}
        <input
          id="projectName"
          type="text"
          className="input"
          placeholder={messages.projectNamePlaceholder}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </label>
      <button type="submit">{messages.createProject}</button>
    </form>
  );
}

const demoProjects = [
  {
    name: 'Project A',
  },
  {
    name: 'Project B',
  },
  {
    name: 'Project C',
  },
];

export default function Dashboard({defaultProjects = demoProjects}) {
  const [projects, setProjects] = useState(defaultProjects);

  const addProject = project => setProjects([...projects, project]);
  const removeProject = name =>
    setProjects(projects.filter(project => project.name !== name));

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
      <ProjectForm addProject={addProject} />
    </div>
  );
}
