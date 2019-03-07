import React, { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import Dashboard from 'dashboard';
import Project from 'project';
import NotFound from 'NotFound';
import { Router, Link } from '@reach/router';
import { projects as demoProjects } from 'test/fixtures';
import { makeRoutePath } from 'utils/routing';
import Loader from 'shared/Loader';
import { saveProjects, useDropboxClient } from 'shared';
import 'App.css';

const Home = () => <div>Home</div>;

let lastProjectsState;

function AccountNav() {
  const { client, authUrl, logout } = useDropboxClient();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (client) {
      client.usersGetCurrentAccount().then(setUserInfo);
    }
  }, []);

  if (!client) {
    return <a href={authUrl}>Login to Dropbox</a>;
  }

  return userInfo ? (
    <div>
      <div>
        <h2>{userInfo.name.familiar_name}</h2>
        <img
          style={{ borderRadius: '50%' }}
          with={50}
          height={50}
          src={userInfo.profile_photo_url}
          alt={userInfo.name.display_name}
        />
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default function App({ defaultProjects = demoProjects }) {
  const [debugState, setDebugState] = useState(false);
  const { updateDatabase } = useDropboxClient();
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
      saveProjects(projects);
      updateDatabase({ data: { projects } });
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
          <li>
            <AccountNav />
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
