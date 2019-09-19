import React from 'react';
import { projects } from 'test/fixtures';
import slugify from '@sindresorhus/slugify';
import { render, fireEvent } from 'react-testing-library';
import ProjectSectionForm, {
  messages,
  DEFAULT_TYPE,
  DEFAULT_SUB_TYPE,
  NAME_SECTION_TYPE,
  NAME_SECTION_SUB_TYPE,
} from './ProjectSectionForm';
import {
  TYPE_PROSE,
  DEFAULT_PROSE_NAME,
  TYPE_IMAGE_COLLECTION,
  SUBTYPE_STYLE_FRAMES,
  SUBTYPE_MOOD_BOARD,
  DEFAULT_IMAGE_COLLECTION_NAME,
} from 'shared';

test('create a new section with a name and defaults', () => {
  const saveNewSection = jest.fn();
  const name = 'NewSection';
  const { getByLabelText, getByText } = render(
    <ProjectSectionForm saveNewSection={saveNewSection} project={projects[0]} />
  );
  const input = getByLabelText(messages.newProjectSectionNameLabel);
  fireEvent.change(input, { target: { value: name } });
  fireEvent.click(getByText(messages.saveNewProjectSectionButtonLabel));
  expect(saveNewSection).toHaveBeenCalledTimes(1);
  expect(saveNewSection).toHaveBeenCalledWith({
    id: slugify(name),
    name,
    [NAME_SECTION_TYPE]: DEFAULT_TYPE,
    [NAME_SECTION_SUB_TYPE]: DEFAULT_SUB_TYPE,
  });
});

test('create a new prose section', () => {
  const saveNewSection = jest.fn();
  const name = 'Story';
  const { getByLabelText, getByText } = render(
    <ProjectSectionForm saveNewSection={saveNewSection} project={projects[0]} />
  );
  const input = getByLabelText(messages.newProjectSectionNameLabel);
  fireEvent.change(input, { target: { value: name } });
  fireEvent.click(getByLabelText(DEFAULT_PROSE_NAME));
  fireEvent.click(getByText(messages.saveNewProjectSectionButtonLabel));

  expect(saveNewSection).toHaveBeenCalledTimes(1);
  expect(saveNewSection).toHaveBeenCalledWith({
    id: slugify(name),
    name,
    [NAME_SECTION_TYPE]: TYPE_PROSE,
    [NAME_SECTION_SUB_TYPE]: null,
  });
});

test('create a Mood board section after initially selecting Prose', () => {
  const saveNewSection = jest.fn();
  const name = 'Story';
  const { getByLabelText, getByText } = render(
    <ProjectSectionForm saveNewSection={saveNewSection} project={projects[0]} />
  );
  const input = getByLabelText(messages.newProjectSectionNameLabel);
  fireEvent.change(input, { target: { value: name } });
  fireEvent.click(getByLabelText(DEFAULT_PROSE_NAME));
  fireEvent.click(getByLabelText(DEFAULT_IMAGE_COLLECTION_NAME));
  fireEvent.click(getByText(messages.saveNewProjectSectionButtonLabel));

  expect(saveNewSection).toHaveBeenCalledTimes(1);
  expect(saveNewSection).toHaveBeenCalledWith({
    id: slugify(name),
    name,
    [NAME_SECTION_TYPE]: TYPE_IMAGE_COLLECTION,
    [NAME_SECTION_SUB_TYPE]: SUBTYPE_MOOD_BOARD,
  });
});
