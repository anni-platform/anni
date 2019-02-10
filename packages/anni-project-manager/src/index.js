import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getProjects } from 'shared';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('root');
const Loader = () => <div>Loading...</div>;

function ApplicationLoader() {
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    getProjects().then(setProjects);
  });

  if (!projects) {
    return <Loader />;
  }
  return <App defaultProjects={projects} />;
}

ReactDOM.render(<ApplicationLoader />, rootEl);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
