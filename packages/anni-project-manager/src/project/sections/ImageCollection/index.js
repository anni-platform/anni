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

export default function ImageCollection({ defaultCollection = [] }) {
  const [collection, setCollection] = useState(defaultCollection);
  function onUploadImage({ target }) {
    const { files } = target;
    const uploadedImages = [...files].map(f => ({
      file: f,
      preview: URL.createObjectURL && URL.createObjectURL(f),
    }));

    setCollection([...collection, ...uploadedImages]);
  }
  return (
    <div>
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
      <label htmlFor={INPUT_ID}>Upload image</label>
      <input
        id={INPUT_ID}
        name={INPUT_ID}
        type="file"
        accept="image/png, image/jpeg"
        onChange={onUploadImage}
      />
    </div>
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
