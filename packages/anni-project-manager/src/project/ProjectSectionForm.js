import React, { useState } from 'react';
import PropTypes from 'prop-types';
import slugify from '@sindresorhus/slugify';
import { projectShape } from 'constants/project';

export const messages = {
  newProjectSectionNameLabel: 'New project section name',
  newProjectSectionNamePlaceholder: 'Section name',
  saveNewProjectSectionButtonLabel: 'Save new project section',
};

export default function ProjectSectionForm({ saveNewSection }) {
  const [name, setName] = useState('');
  function onSubmit(e) {
    e.preventDefault();
    saveNewSection({ name, id: slugify(name) });
  }
  return (
    <form onSubmit={onSubmit}>
      <label>
        {messages.newProjectSectionNameLabel}
        <input
          value={name}
          onChange={({ target }) => setName(target.value)}
          name="newProjectSectionName"
          placeholder={messages.newProjectSectionNamePlaceholder}
        />
      </label>
      <button type="submit">{messages.saveNewProjectSectionButtonLabel}</button>
    </form>
  );
}

ProjectSectionForm.propTypes = {
  project: projectShape,
  saveNewSection: PropTypes.func.isRequired,
};
