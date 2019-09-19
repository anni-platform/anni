import React, { useState, useEffect } from 'react';
import difference from 'lodash/difference';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => (
  <span
    style={{
      border: '1px dotted gold',
      cursor: 'grab',
      padding: 8,
      display: 'inline-block',
    }}
  >
    :::
  </span>
)); // This can be any component you want

const SortableItem = SortableElement(
  ({ renderItem = () => 'feed me', value }) => {
    return (
      <li>
        <DragHandle />
        {typeof renderItem === 'string' ? value : renderItem(value)}
      </li>
    );
  }
);

const SortableList = SortableContainer(
  ({ items, listStyle = {}, ...restProps }) => {
    return (
      <ul style={listStyle}>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
            {...restProps}
          />
        ))}
      </ul>
    );
  }
);

const demoItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

export default function SortableDragHandleList({
  axis = 'y',
  defaultItems = demoItems,
  onReorder = () => null,
  ...restProps
}) {
  const [items, setItems] = useState(defaultItems);

  useEffect(() => {
    const newItems = difference(defaultItems, items);
    if (newItems.length > 0) {
      setItems([...items, ...newItems]);
    }
  });

  useEffect(
    () => {
      if (defaultItems !== items) {
        setItems(defaultItems);
      }
    },
    [defaultItems]
  );

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = arrayMove(items, oldIndex, newIndex);
    onReorder(newItems);
    setItems(newItems);
  };

  return (
    <SortableList
      {...restProps}
      axis={axis}
      items={items}
      onSortEnd={onSortEnd}
      useDragHandle={true}
    />
  );
}
