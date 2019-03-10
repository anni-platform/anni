import React from 'react';
import SortableList from 'shared/SortableList';

function renderImageItem() {
  return (
    <div
      style={{
        width: 200,
        height: 200,
        margin: 4,
        background: 'palevioletred',
      }}
    >
      hola
    </div>
  );
}

const listStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

export default function ImageCollection() {
  return (
    <SortableList
      axis="xy"
      listStyle={listStyle}
      renderItem={renderImageItem}
    />
  );
}
