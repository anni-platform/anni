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

const HOME_PATH = makeRoutePath('/');
const Home = () => <div>Home</div>;

let lastProjectsState;

function removeHash() {
  window.history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search
  );
}

function AccountNav({ client, authUrl, logout }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (client) {
      removeHash();
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
  const db = useDropboxClient();
  const { client, updateDatabase } = db;
  lastProjectsState = defaultProjects;
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(
    () => {
      if (!client) {
        // navigate(HOME_PATH);
        window.location.href = window.location.origin;
      }
    },
    [client]
  );

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
    if (client && !isEqual(lastProjectsState, projects)) {
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
            <Link to={HOME_PATH}>Home</Link>
          </li>
          {client && (
            <li>
              <Link to={makeRoutePath('dashboard')}>Dashboard</Link>
            </li>
          )}
          <li>
            <AccountNav {...db} />
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
