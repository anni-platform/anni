import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import { renderWithLocation } from 'test/utils';
import { messages as notFoundMessages } from 'NotFound';
import { projects } from 'test/fixtures';

// @TODO: Fix these tests

xtest('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

xtest('navigate to /dashboard', () => {
  const { container, queryByText } = renderWithLocation('/dashboard', () => (
    <App defaultProjects={projects} />
  ));

  // Then there is a list of projects
  expect(container).toContainElement(queryByText(projects[0].name));
  expect(container).toContainElement(queryByText(projects[1].name));
  expect(container).toContainElement(queryByText(projects[2].name));
});

xtest('navigate to an unknown project', () => {
  const { container, queryByText } = renderWithLocation('/foobar', () => (
    <App defaultProjects={projects} />
  ));

  expect(container).toContainElement(queryByText(notFoundMessages.title));
});

xtest('navigate to existing project', () => {
  const [project] = projects;
  const { container, queryByText } = renderWithLocation(
    `/${project.id}`,
    () => <App defaultProjects={projects} />
  );

  expect(container).not.toContainElement(queryByText(notFoundMessages.title));
  expect(container).toContainElement(queryByText(project.name));
  expect(container).toContainElement(queryByText(project.details));
});
