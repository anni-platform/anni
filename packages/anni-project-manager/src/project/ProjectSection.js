import React from 'react';
import PropTypes from 'prop-types';
import {
  projectSectionTypes,
  projectSectionSubTypes,
  projectShape,
  TYPE_PROSE,
  TYPE_IMAGE_COLLECTION,
} from 'shared';
import { PROJECT_SECTION } from 'test/ids';
import ProseSection from './sections/Prose';
import ImageCollection from './sections/ImageCollection';

function renderSectionContent(type, props) {
  switch (type) {
    case TYPE_PROSE:
      return <ProseSection {...props} />;
    case TYPE_IMAGE_COLLECTION:
      return <ImageCollection {...props} />;
    default:
      return <div>Section content pending for type: {type}</div>;
  }
}

export default function ProjectSection({ updateProjectSection, ...restProps }) {
  const { id, name, project, subtype, type } = restProps;
  const props = {
    ...restProps,
    save: update => updateProjectSection(project.id, id, update),
  };
  return (
    <div data-testid={PROJECT_SECTION}>
      <h1>
        {project.name} - {name}
      </h1>
      {renderSectionContent(type, props)}
      {subtype && ` - ${subtype}`}
    </div>
  );
}

ProjectSection.propTypes = {
  name: PropTypes.string,
  project: projectShape,
  subtype: projectSectionSubTypes,
  type: projectSectionTypes,
};
