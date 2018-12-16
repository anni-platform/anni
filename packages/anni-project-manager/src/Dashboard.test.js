import React, { useState } from 'react';
import { render, fireEvent } from 'react-testing-library';
import Dashboard, {
  messages,
  generateRemoveButtonAriaLabel,
} from './Dashboard';

function DashboardWithState({ defaultProjects }) {
  const [projects, setProjects] = useState(defaultProjects);
  return <Dashboard projects={projects} setProjects={setProjects} />;
}

test('no projects state', () => {
  const { container, getByLabelText, getByText } = render(
    <DashboardWithState defaultProjects={[]} />
  );
  expect(container).toContainElement(getByText(messages.noProjects));
  expect(container).toContainElement(getByLabelText(messages.projectNameLabel));
});

test('add the only project', () => {
  const newProjectName = 'Ai!';
  const { container, getByLabelText, getByText, queryByText } = render(
    <DashboardWithState defaultProjects={[]} />
  );
  // Given a project form
  const projectName = getByLabelText(messages.projectNameLabel);

  expect(container).not.toContainElement(queryByText(newProjectName));

  // When I enter a project name and click the submit button
  fireEvent.change(projectName, {
    target: { value: newProjectName },
  });
  fireEvent.click(getByText(messages.createProject));

  // The project is created and renders in the list
  expect(container).not.toContainElement(queryByText(messages.noProjects));
  expect(container).toContainElement(queryByText(newProjectName));
});

test('removing the only project', () => {
  const projectName = 'Apple';
  const { container, getByLabelText, getByText, queryByText } = render(
    <DashboardWithState defaultProjects={[{ name: projectName }]} />
  );

  expect(container).toContainElement(queryByText(projectName));
  expect(container).not.toContainElement(queryByText(messages.noProjects));

  fireEvent.click(queryByText(messages.removeProject));
  expect(container).toContainElement(queryByText(messages.noProjects));
  expect(container).not.toContainElement(queryByText(projectName));
});

test('add a project', () => {
  const existingProjectName = 'Foo';
  const newProjectName = 'Ai!';
  const { container, getByLabelText, getByText, queryByText } = render(
    <DashboardWithState defaultProjects={[{ name: existingProjectName }]} />
  );
  // Given a project form
  const projectName = getByLabelText(messages.projectNameLabel);

  expect(container).not.toContainElement(queryByText(newProjectName));

  // When I enter a project name and click the submit button
  fireEvent.change(projectName, {
    target: { value: newProjectName },
  });
  fireEvent.click(getByText(messages.createProject));

  // The project is created and renders in the list
  expect(container).toContainElement(queryByText(existingProjectName));
  expect(container).toContainElement(queryByText(newProjectName));
});

test('removing a project', () => {
  const projectName = 'Apple';
  const n1 = 'Bert';
  const n2 = 'Ernie';
  const { container, getByLabelText, getByText, queryByText } = render(
    <DashboardWithState
      defaultProjects={[{ name: n1 }, { name: projectName }, { name: n2 }]}
    />
  );

  expect(container).toContainElement(queryByText(projectName));

  fireEvent.click(getByLabelText(generateRemoveButtonAriaLabel(projectName)));

  expect(container).not.toContainElement(queryByText(projectName));
  expect(container).toContainElement(queryByText(n1));
  expect(container).toContainElement(queryByText(n2));
});

test('adding a project name that already exists', () => {
  const projectName = 'Apple';
  const validProjectName = 'Risotto Party';
  const {
    container,
    getByLabelText,
    getByText,
    queryByText,
    queryAllByText,
  } = render(<DashboardWithState defaultProjects={[{ name: projectName }]} />);

  const projectNameField = getByLabelText(messages.projectNameLabel);

  // When I enter the same project name and click the submit button
  fireEvent.change(projectNameField, {
    target: { value: projectName },
  });
  fireEvent.click(getByText(messages.createProject));

  // I should see an error explaining the project name is already taken
  expect(queryAllByText(projectName)).toHaveLength(1);
  expect(projectNameField).toHaveAttribute('aria-invalid');
  expect(container).toContainElement(
    queryByText(messages.errorProjectNameTaken)
  );
  expect(projectNameField).toHaveAttribute('aria-describedby');

  // The invalid input value remains the same
  expect(projectNameField.value).toEqual(projectName);

  // Then when I edit the project name so it is valid the error should clear
  fireEvent.change(projectNameField, {
    target: { value: validProjectName },
  });
  expect(projectNameField).not.toHaveAttribute('aria-invalid');
  expect(container).not.toContainElement(
    queryByText(messages.errorProjectNameTaken)
  );
  expect(projectNameField).not.toHaveAttribute('aria-describedby');

  // And when I click the create project button it saves and clears the form
  fireEvent.click(getByText(messages.createProject));
  expect(projectNameField.value).toEqual('');
  expect(container).toContainElement(queryByText(validProjectName));
});
