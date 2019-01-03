import React, { useState, useEffect } from 'react';
import difference from 'lodash/difference';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span>::</span>); // This can be any component you want

const SortableItem = SortableElement(
  ({ renderItem = () => 'feed me', value }) => {
    return (
      <li>
        <DragHandle />
        {typeof value === 'string' ? value : renderItem(value)}
      </li>
    );
  }
);

const SortableList = SortableContainer(({ items, ...restProps }) => {
  return (
    <ul>
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
});

const demoItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

export default function SortableDragHandleList({
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

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newItems = arrayMove(items, oldIndex, newIndex);
    onReorder(newItems);
    setItems(newItems);
  };

  return (
    <SortableList
      {...restProps}
      items={items}
      onSortEnd={onSortEnd}
      useDragHandle={true}
    />
  );
}
