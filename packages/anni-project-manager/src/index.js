import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getProjects, useDropboxClient } from 'shared';
import ApplicationProvider from 'Providers';
import './index.css';
import App from './App';
import Loader from 'shared/Loader';
import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('root');

function PresentationPanel({ children }) {
  return <div className="PresentationPanel">{children}</div>;
}

function LandingPage() {
  const { authUrl } = useDropboxClient();
  return (
    <PresentationPanel>
      <div>
        <h1>Anni</h1>
        <a href={authUrl}>Login with Dropbox</a>
      </div>
    </PresentationPanel>
  );
}

function ApplicationLoader() {
  const { client, readDatabase } = useDropboxClient();
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    if (client) {
      readDatabase().then(database => {
        if (database) {
          setProjects(database.projects);
        } else {
          getProjects().then(setProjects);
        }
      });
    }
  });

  if (!client) {
    return <LandingPage />;
  }

  if (!projects) {
    return (
      <PresentationPanel>
        <Loader />
      </PresentationPanel>
    );
  }
  return (
    <ApplicationProvider>
      <App defaultProjects={projects} />
    </ApplicationProvider>
  );
}

ReactDOM.render(
  <ApplicationProvider>
    <ApplicationLoader />
  </ApplicationProvider>,
  rootEl
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
