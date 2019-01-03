import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { projectShape } from 'constants/project';
import SortableList from 'shared/SortableList';
import ProjectSectionForm from 'project/ProjectSectionForm';

const messages = {
  cancel: 'Cancel',
  saveChanges: 'Save Changes',
};

export default function ProjectSettings({
  project,
  updateProject,
  toggleEditing,
}) {
  const [projectState, updateProjectState] = useState(project);
  const { sections } = projectState;
  function saveChanges() {
    updateProject(projectState);
    toggleEditing();
  }
  return (
    <div>
      <SortableList
        defaultItems={sections}
        onReorder={sections => updateProjectState({ ...project, sections })}
        renderItem={({ name }) => <strong>{name}</strong>}
      />
      <ProjectSectionForm
        project={projectState}
        saveNewSection={newSection => {
          updateProjectState({
            id: project.id,
            sections: [...sections, newSection],
          });
        }}
      />
      <button onClick={saveChanges}>{messages.saveChanges}</button>
      <button onClick={toggleEditing}>{messages.cancel}</button>
    </div>
  );
}

ProjectSettings.propTypes = {
  project: projectShape,
  toggleEditing: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
};
