import React, { useState } from 'react';
import Dashboard from 'Dashboard';
import Project from 'Project';
import NotFound from 'NotFound';
import { Router, Link } from '@reach/router';
import { projects as demoProjects } from 'test/fixtures.json';

const Home = () => <div>Home</div>;

export default function App({ defaultProjects = demoProjects }) {
  const [projects, setProjects] = useState(defaultProjects);

  return (
    <div>
      <header>
        Anni Project Manager Application
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="dashboard">Dashboard</Link>
          </li>
        </ul>
      </header>
      <Router>
        <Home path="/" />
        <Dashboard
          path="dashboard"
          projects={projects}
          setProjects={setProjects}
        />
        <Project path=":projectId" projects={projects} />
        <NotFound default />
      </Router>
    </div>
  );
}
