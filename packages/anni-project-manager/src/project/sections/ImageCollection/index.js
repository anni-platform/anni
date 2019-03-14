import React, { useState, useEffect } from 'react';
import uniqueId from 'lodash/uniqueId';
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

async function uploadNewFiles({ newFiles, collection, uploadImage }) {
  const newUploads = await Promise.all(
    newFiles.map(({ file }) => uploadImage({ file }))
  );
  const idToUrlMap = newUploads.reduce(
    (acc, { url }, index) => ({
      ...acc,
      [newFiles[index].id]: url,
    }),
    {}
  );

  return collection.map(item => {
    const remoteUrl = idToUrlMap[item.id];
    if (remoteUrl) {
      return {
        ...item,
        url: remoteUrl,
        uploaded: true,
      };
    } else {
      return item;
    }
  });
}

export default function ImageCollection(props) {
  const { collection: defaultCollection, save } = props;
  const [collection, setCollection] = useState(defaultCollection || []);
  const { isFileDropActive } = useFileDrop();

  const handleNewUploads =
    // This is a bummer, but testing async useEffect is tricky rn
    // https://github.com/threepointone/react-act-examples
    process.env.NODE_ENV !== 'test'
      ? () => {
          const newFiles = collection.filter(f => !f.uploaded);
          if (newFiles.length) {
            uploadNewFiles({
              ...props,
              collection,
              newFiles,
            }).then(setCollection);
          }
        }
      : () => {};

  useEffect(handleNewUploads, [collection]);

  function addFilesToCollection(files) {
    const imagesToUpload = files.map(file => ({
      id: uniqueId(file.name),
      name: file.name,
      file,
      preview: URL.createObjectURL && URL.createObjectURL(file),
      uploaded: false,
    }));
    setCollection([...collection, ...imagesToUpload]);
  }

  function onUploadImage({ target }) {
    addFilesToCollection([...target.files]);
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
      <button onClick={() => save({ collection })}>Save</button>
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
  uploadImage: PropTypes.func.isRequired,
  save: PropTypes.func,
};

ImageCollection.defaultProps = {
  uploadImage: console.log,
};
