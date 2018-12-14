import React from 'react';
import {render, fireEvent, waitForElement} from 'react-testing-library';
import Dashboard, {messages} from './Dashboard';

test('no projects state', () => {
  const {container, getByLabelText, getByText} = render(
    <Dashboard defaultProjects={[]} />
  );
  expect(container).toContainElement(getByText(messages.noProjects));
  expect(container).toContainElement(getByLabelText(messages.projectNameLabel));
});

test('add a new project', () => {
  const newProjectName = 'Ai!';
  const {container, getByLabelText, getByText, queryByText} = render(
    <Dashboard defaultProjects={[]} />
  );
  // Given a project form
  const projectName = getByLabelText(messages.projectNameLabel);

  expect(container).not.toContainElement(queryByText(newProjectName));

  // When I enter a project name and click the submit button
  fireEvent.change(projectName, {
    target: {value: newProjectName},
  });
  fireEvent.click(getByText(messages.createProject));

  // The project is created and renders in the list
  expect(container).not.toContainElement(queryByText(messages.noProjects));
  expect(container).toContainElement(queryByText(newProjectName));
});

test('removing the only project', () => {
  const projectName = 'Apple';
  const {container, getByLabelText, getByText, queryByText} = render(
    <Dashboard defaultProjects={[{name: projectName}]} />
  );

  expect(container).toContainElement(queryByText(projectName));
  expect(container).not.toContainElement(queryByText(messages.noProjects));

  fireEvent.click(queryByText(messages.removeProject));
  expect(container).toContainElement(queryByText(messages.noProjects));
  expect(container).not.toContainElement(queryByText(projectName));
});
