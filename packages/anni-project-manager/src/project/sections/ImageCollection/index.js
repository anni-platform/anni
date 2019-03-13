import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SortableList from 'shared/SortableList';

function renderImageItem({ file, url, preview, title, description }) {
  return (
    <figure style={{ maxWidth: 300, position: 'relative' }}>
      <img
        src={url || preview}
        alt={title || description || (file && file.name)}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <figcaption>{description}</figcaption>
    </figure>
  );
}

const listStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

const INPUT_ID = 'imageCollectionUploadInput';

function useFileDrop(initialState) {
  const [isFileDropActive, setIsActive] = useState(initialState);

  return { isFileDropActive, setIsActive };
}

function FilesDropZone({ children, onDrop }) {
  const { isFileDropActive, setIsActive } = useFileDrop(false);
  function dropHandler(ev) {
    ev.preventDefault();

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    let files;

    if (ev.dataTransfer.items) {
      files = [...ev.dataTransfer.items]
        .filter(({ kind }) => kind === 'file')
        .map(f => f.getAsFile());
    } else {
      files = [...ev.dataTransfer.files];
    }

    if (files) {
      onDrop(files);
    }
  }

  return (
    <div
      onDropCapture={dropHandler}
      onDragOverCapture={e => {
        e.preventDefault();
        setIsActive(true);
      }}
      onDragLeaveCapture={() => setIsActive(false)}
      style={{
        padding: 8,
        background: isFileDropActive ? 'MediumSpringGreen' : 'transparent',
      }}
    >
      {children}
    </div>
  );
}

export default function ImageCollection({ defaultCollection = [] }) {
  const [collection, setCollection] = useState(defaultCollection);
  const { isFileDropActive } = useFileDrop();

  function addFilesToCollection(files) {
    const imagesToUpload = files.map(f => ({
      file: f,
      preview: URL.createObjectURL && URL.createObjectURL(f),
    }));
    setCollection([...collection, ...imagesToUpload]);
  }

  function onUploadImage({ target }) {
    const { files } = target;
    addFilesToCollection([...files]);
  }

  return (
    <FilesDropZone onDrop={addFilesToCollection}>
      {collection.length > 0 ? (
        <SortableList
          axis="xy"
          defaultItems={collection}
          listStyle={listStyle}
          onReorder={setCollection}
          renderItem={renderImageItem}
        />
      ) : (
        <p>No images.</p>
      )}
      <label htmlFor={INPUT_ID}>
        Upload image {isFileDropActive && 'ACTIVE!'}
      </label>
      <input
        id={INPUT_ID}
        name={INPUT_ID}
        type="file"
        accept="image/png, image/jpeg"
        multiple
        onChange={onUploadImage}
      />
    </FilesDropZone>
  );
}

ImageCollection.propTypes = {
  defaultCollection: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};
