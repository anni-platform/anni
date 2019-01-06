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
} from 'shared';

export const messages = {
  newProjectSectionNameLabel: 'New project section name',
  newProjectSectionNamePlaceholder: 'Section name',
  saveNewProjectSectionButtonLabel: 'Add new project section',
};

export const NAME_SECTION_TYPE = 'type';
export const NAME_SECTION_SUB_TYPE = 'subtype';
export const DEFAULT_TYPE = TYPE_IMAGE_COLLECTION;
export const DEFAULT_SUB_TYPE = SUBTYPE_MOOD_BOARD;

const initialState = {
  name: '',
  type: DEFAULT_TYPE,
  subtype: DEFAULT_SUB_TYPE,
};

const isTypeSelected = (type, state) => type === state.type;
const isSubTypeSelected = (type, state) => type === state.subtype;

const reducer = (oldState, newState) => ({ ...oldState, ...newState });

export default function ProjectSectionForm({ saveNewSection }) {
  const [state, setState] = useReducer(reducer, initialState);
  const setName = name => setState({ name });
  const setSubType = subtype => setState({ subtype });
  const setType = type => {
    setState({ type });
    setSubType(
      Array.isArray(SECTION_CONFIG[type]) ? SECTION_CONFIG[type][0] : null
    );
  };
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
