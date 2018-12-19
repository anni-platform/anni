import React from 'react';
import Project from 'Project';
import { projects } from 'test/fixtures';
import { within } from 'react-testing-library';
import { PROJECT_SECTION } from 'test/ids';
import { renderWithLocation } from 'test/utils';
import {
  TYPE_IMAGE_COLLECTION,
  TYPE_MOTION,
  DEFAULT_PROSE_NAME,
  SUBTYPE_MOOD_BOARD,
  SUBTYPE_STORY_BOARD,
  SUBTYPE_STYLE_FRAMES,
} from 'constants/project';

test('renders a project overview by default', () => {
  const [project] = projects;
  const { container, queryByText } = renderWithLocation(
    '',
    <Project projects={projects} projectId={project.id} />
  );

  expect(container).toContainElement(queryByText(project.name));
  expect(container).toContainElement(queryByText(project.details));
});

test('navigate to default script section', () => {
  const [project] = projects;
  const scriptSection = project.sections.find(
    ({ name }) => name === DEFAULT_PROSE_NAME
  );
  const { container, getByTestId } = renderWithLocation(
    scriptSection.id,
    <Project projects={projects} projectId={project.id} />
  );

  expect(container).toContainElement(
    within(getByTestId(PROJECT_SECTION)).getByText(
      new RegExp(scriptSection.name)
    )
  );
});

test('navigate to default mood board section', () => {
  const [project] = projects;
  const moodBoardSection = project.sections.find(
    ({ type, subtype }) =>
      type === TYPE_IMAGE_COLLECTION && subtype === SUBTYPE_MOOD_BOARD
  );
  const { container, getByTestId } = renderWithLocation(
    moodBoardSection.id,
    <Project projects={projects} projectId={project.id} />
  );

  expect(container).toContainElement(
    within(getByTestId(PROJECT_SECTION)).getByText(
      new RegExp(moodBoardSection.name)
    )
  );
});

test('navigate to default story board section', () => {
  const [project] = projects;
  const storyBoardSection = project.sections.find(
    ({ type, subtype }) =>
      type === TYPE_IMAGE_COLLECTION && subtype === SUBTYPE_STORY_BOARD
  );
  const { container, getByTestId } = renderWithLocation(
    storyBoardSection.id,
    <Project projects={projects} projectId={project.id} />
  );

  expect(container).toContainElement(
    within(getByTestId(PROJECT_SECTION)).getByText(
      new RegExp(storyBoardSection.name)
    )
  );
});

test('navigate to default style frames section', () => {
  const [project] = projects;
  const styleFramesSection = project.sections.find(
    ({ type, subtype }) =>
      type === TYPE_IMAGE_COLLECTION && subtype === SUBTYPE_STYLE_FRAMES
  );
  const { container, getByTestId } = renderWithLocation(
    styleFramesSection.id,
    <Project projects={projects} projectId={project.id} />
  );

  expect(container).toContainElement(
    within(getByTestId(PROJECT_SECTION)).getByText(
      new RegExp(styleFramesSection.name)
    )
  );
});

test('navigate to default animation section', () => {
  const [project] = projects;
  const animationSection = project.sections.find(
    ({ type }) => type === TYPE_MOTION
  );
  const { container, getByTestId } = renderWithLocation(
    animationSection.id,
    <Project projects={projects} projectId={project.id} />
  );

  expect(container).toContainElement(
    within(getByTestId(PROJECT_SECTION)).getByText(
      new RegExp(animationSection.name)
    )
  );
});
