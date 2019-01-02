import React from 'react';
import { projects } from 'test/fixtures';
import ProjectSectionForm, { messages } from './ProjectSectionForm';
import { render, fireEvent } from 'react-testing-library';

test('create a new section with a unique name', () => {
  const saveNewSection = jest.fn();
  const { getByLabelText, getByText } = render(
    <ProjectSectionForm saveNewSection={saveNewSection} project={projects[0]} />
  );
  const input = getByLabelText(messages.newProjectSectionNameLabel);
  fireEvent.change(input, { target: { value: 'NewSection' } });
  fireEvent.click(getByText(messages.saveNewProjectSectionButtonLabel));
});
