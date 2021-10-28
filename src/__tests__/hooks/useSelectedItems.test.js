import { renderHook, act, waitFor } from "@testing-library/react-hooks";
import { useSelectedItems } from "hooks/useSelectedItems";

it('returns an array of selected items that is initially empty', () => {
  const { result } = renderHook(() => useSelectedItems());

  const [selectedItems] = result.current;

  expect(selectedItems).toEqual([]);
});

it('allows items to be added', () => {
  const { result, waitFor } = renderHook(() => useSelectedItems());

  const [selectedItems, addItem] = result.current;

  expect(selectedItems).toEqual([]);

  act(() => {
    addItem(0);
  });

  waitFor(() => expect(selectedItems).toEqual([0]));
});

it('allows an item to be removed by its type', () => {
  const { result, waitFor } = renderHook(() => useSelectedItems());

  const [selectedItems, addItem, removeItemsOfType] = result.current;

  expect(selectedItems).toEqual([]);

  act(() => {
    addItem({ type: 'test' });
  });

  waitFor(() => expect(selectedItems).toEqual([{ type: 'test' }]));

  act(() => {
    removeItemsOfType('test');
  });

  expect(selectedItems).toEqual([]);
});

it('allows an item with a specific name to be removed', () => {
  const { result, waitFor } = renderHook(() => useSelectedItems());

  const [selectedItems, addItem, removeItemsOfType, removeItemWithName] = result.current;

  expect(selectedItems).toEqual([]);

  act(() => {
    addItem({ name: 'test' });
  });

  waitFor(() => expect(selectedItems).toEqual([{ name: 'test' }]));

  act(() => {
    removeItemWithName('test');
  });

  expect(selectedItems).toEqual([]);
});