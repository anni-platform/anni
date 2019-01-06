import React, { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import Dashboard from 'dashboard';
import Project from 'project';
import NotFound from 'NotFound';
import { Router, Link } from '@reach/router';
import { projects as demoProjects } from 'test/fixtures';
import { makeRoutePath } from 'utils/routing';
import { saveProjects } from 'shared';
import 'App.css';

const Home = () => <div>Home</div>;

let lastProjectsState;

export default function App({ defaultProjects = demoProjects }) {
  const [debugState, setDebugState] = useState(false);
  lastProjectsState = defaultProjects;
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

  useEffect(() => {
    if (!isEqual(lastProjectsState, projects)) {
      console.log('new change saving');
      saveProjects(projects);
      lastProjectsState = projects;
    }
  });

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
      <footer
        style={{
          padding: '100px 20px',
          background: 'MintCream',
          float: 'right',
        }}
      >
        <button onClick={() => setDebugState(!debugState)}>Debug State</button>
        {debugState && (
          <pre style={{ background: 'lavender', padding: 10 }}>
            {JSON.stringify(projects, null, 2)}
          </pre>
        )}
      </footer>
    </div>
  );
}
