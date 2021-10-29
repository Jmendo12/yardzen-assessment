import { renderHook } from "@testing-library/react-hooks";
import { useItems } from 'hooks/useItems';
import { getItems } from "api/getItems";

jest.mock('api/getItems');

it('returns an array of items', () => {
  const items = [
    {
      type: "test",
      name: "name",
      lowPrice: "60.00",
      highPrice: "100.00"
    },
    {
      type: "test1",
      name: "name1",
      lowPrice: "160.00",
      highPrice: "150.00"
    }
  ];

  getItems.mockReturnValueOnce(items);

  const { result, waitFor } = renderHook(() => useItems());

  const retrievedItems = result.current;

  waitFor(() => expect(retrievedItems).toEqual(items));
});