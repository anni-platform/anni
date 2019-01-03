import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import slugify from '@sindresorhus/slugify';
import {
  projectShape,
  SECTION_CONFIG,
  SECTION_TYPE_NAMES,
  SECTION_SUB_TYPE_NAMES,
  TYPE_IMAGE_COLLECTION,
  SUBTYPE_MOOD_BOARD,
} from 'constants/project';

export const messages = {
  newProjectSectionNameLabel: 'New project section name',
  newProjectSectionNamePlaceholder: 'Section name',
  saveNewProjectSectionButtonLabel: 'Add new project section',
};

const NAME_SECTION_TYPE = 'type';
const NAME_SECTION_SUB_TYPE = 'subtype';

const initialState = {
  name: '',
  type: TYPE_IMAGE_COLLECTION,
  subtype: SUBTYPE_MOOD_BOARD,
};

const isTypeSelected = (type, state) => type === state.type;
const isSubTypeSelected = (type, state) => type === state.subtype;

const reducer = (oldState, newState) => ({ ...oldState, ...newState });

export default function ProjectSectionForm({ saveNewSection }) {
  const [state, setState] = useReducer(reducer, initialState);
  const setName = name => setState({ name });
  const setType = type => setState({ type });
  const setSubType = subtype => setState({ subtype });
  function onSubmit(e) {
    e.preventDefault();
    saveNewSection({ ...state, id: slugify(state.name) });
    setState(initialState);
  }
  return (
    <form onSubmit={onSubmit}>
      <label>
        {messages.newProjectSectionNameLabel}
        <input
          value={state.name}
          onChange={({ target }) => setName(target.value)}
          name="newProjectSectionName"
          placeholder={messages.newProjectSectionNamePlaceholder}
        />
      </label>
      <ul>
        {Object.entries(SECTION_CONFIG).map(([type, subtypes]) => (
          <li key={type}>
            <label>
              <input
                checked={isTypeSelected(type, state)}
                type="radio"
                name={NAME_SECTION_TYPE}
                onChange={() => setType(type)}
                value={type}
              />
              {SECTION_TYPE_NAMES[type]}
            </label>
            {isTypeSelected(type, state) && Array.isArray(subtypes) && (
              <ul>
                {subtypes.map(subtype => (
                  <li key={subtype}>
                    <label>
                      <input
                        checked={isSubTypeSelected(subtype, state)}
                        type="radio"
                        name={NAME_SECTION_SUB_TYPE}
                        onChange={() => setSubType(subtype)}
                        value={type}
                      />
                      {SECTION_SUB_TYPE_NAMES[subtype]}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <button type="submit">{messages.saveNewProjectSectionButtonLabel}</button>
    </form>
  );
}

ProjectSectionForm.propTypes = {
  project: projectShape,
  saveNewSection: PropTypes.func.isRequired,
};
