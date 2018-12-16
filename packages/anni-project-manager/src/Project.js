import React from 'react';
import NotFound from './NotFound';

export default function Project({ projects, projectId }) {
  const project = projects.find(({ id }) => id === projectId);
  if (project) {
    return (
      <div>
        <h1>{project.name}</h1>
        <p>{project.details}</p>
      </div>
    );
  }
  return <NotFound />;
}
