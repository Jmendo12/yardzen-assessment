import { useState, useEffect } from 'react';
import { getItems } from 'api/getItems';

export function useItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      const retrievedItems = await getItems();

      setItems(retrievedItems);
    }

    fetchItems();
  }, [])

  return items;
}