import { renderHook } from '@testing-library/react-hooks';
import { useItemPriceAggregations } from 'hooks/useItemPriceAggregations';

const items = [
  {
    type: "test1",
    name: "name",
    lowPrice: "60.00",
    highPrice: "100.00"
  },
  {
    type: "test1",
    name: "name2",
    lowPrice: "50.00",
    highPrice: "100.00"
  },
  {
    type: "test2",
    name: "name3",
    lowPrice: "150.00",
    highPrice: "200.00"
  }
];

it('returns a count of the number of items', () => {
  const { result } = renderHook(() => useItemPriceAggregations(items));

  const itemPriceAggregations = result.current;

  expect(itemPriceAggregations).toHaveProperty('itemCount', 3);
});

it('returns a sum of the total minimum price', () => {
  const { result } = renderHook(() => useItemPriceAggregations(items));

  const itemPriceAggregations = result.current;

  expect(itemPriceAggregations).toHaveProperty('minTotalPrice', "260.00");
});

it('returns a sum of the total max price', () => {
  const { result } = renderHook(() => useItemPriceAggregations(items));

  const itemPriceAggregations = result.current;

  expect(itemPriceAggregations).toHaveProperty('maxTotalPrice', "400.00");
});