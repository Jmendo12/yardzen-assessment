import { useMemo } from 'react';

export function useItemTypes(items) {
  /*
    We'll first get an array of all types with duplicates, and then filter it so there are no duplicates.
    We use an array instead of a set because we still need to map the types to components.
  */
  const itemTypes = useMemo(
    () => (
      items.map(item => item.type).filter((itemType, index, itemTypes) => itemTypes.indexOf(itemType) === index)
    ),
    [items]
  );

  return itemTypes;
}