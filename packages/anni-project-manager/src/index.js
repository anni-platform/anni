import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { unstable_createResource as createResource } from 'react-cache';
import { getProjects } from 'shared';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('root');

const projectsResource = createResource(getProjects);

const Loader = () => <div>Loading...</div>;

function Application() {
  const projects = projectsResource.read();
  return <App defaultProjects={projects} />;
}

function ApplicationLoader() {
  return (
    <Suspense fallback={<Loader />}>
      <Application />
    </Suspense>
  );
}

ReactDOM.render(<ApplicationLoader />, rootEl);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
