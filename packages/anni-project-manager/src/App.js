import React, { useState } from 'react';
import Dashboard from 'Dashboard';
import Project from 'Project';
import NotFound from 'NotFound';
import { Router, Link } from '@reach/router';
import { projects as demoProjects } from 'test/fixtures';
import { makeRoutePath } from 'utils/routing';
import 'App.css';

const Home = () => <div>Home</div>;

export default function App({ defaultProjects = demoProjects }) {
  const [projects, setProjects] = useState(defaultProjects);

  function updateProject(projectUpdate) {
    setProjects(
      projects.map(project => {
        if (project.id === projectUpdate.id) {
          return {
            ...project,
            ...projectUpdate,
          };
        }
        return project;
      })
    );
  }

  return (
    <div className="App">
      <header>
        Anni Project Manager Application
        <ul>
          <li>
            <Link to={makeRoutePath('/')}>Home</Link>
          </li>
          <li>
            <Link to={makeRoutePath('dashboard')}>Dashboard</Link>
          </li>
        </ul>
      </header>
      <Router>
        <Home path={makeRoutePath('/')} />
        <Dashboard
          path={makeRoutePath('dashboard')}
          projects={projects}
          setProjects={setProjects}
        />
        <Project
          path={makeRoutePath(':projectId/*')}
          projects={projects}
          updateProject={updateProject}
        />
        <NotFound default />
      </Router>
    </div>
  );
}
