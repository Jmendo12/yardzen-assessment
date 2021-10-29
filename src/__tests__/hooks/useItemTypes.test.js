import { renderHook } from '@testing-library/react-hooks';
import { useItemTypes } from 'hooks/useItemTypes';

it('returns an array of unique item types', () => {
  const items = [
    {
      type: "test1",
      name: "name",
      lowPrice: 60,
      highPrice: 100
    },
    {
      type: "test1",
      name: "name2",
      lowPrice: 50,
      highPrice: 100
    },
    {
      type: "test2",
      name: "name3",
      lowPrice: 150,
      highPrice: 200
    }
  ];

  const { result } = renderHook(() => useItemTypes(items));

  const itemTypes = result.current;

  expect(itemTypes).toEqual(["test1", "test2"]);
});