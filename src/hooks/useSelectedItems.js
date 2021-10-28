import { useState } from 'react';

export function useSelectedItems() {
  const [selectedItems, setSelectedItems] = useState([]);

  const addItem = (newItem) => {
    setSelectedItems((prev) => [...prev, newItem]);
  }

  const removeItemsOfType = (typeToRemove) => {
    setSelectedItems((prev) => prev.filter(item => item.type !== typeToRemove));
  }

  const removeItemWithName = (nameOfItemToRemove) => {
    setSelectedItems((prev) => prev.filter(item => item.name !== nameOfItemToRemove));
  }

  return [
    selectedItems,
    addItem,
    removeItemsOfType,
    removeItemWithName
  ];
}