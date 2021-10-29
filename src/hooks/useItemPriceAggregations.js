import { useMemo } from 'react';

export function useItemPriceAggregations(items) {
  const itemPriceAggregations = useMemo(
    () => (
      {
        itemCount: items.length,
        minTotalPrice: items.reduce((lowSum, { lowPrice }) => lowSum + parseFloat(lowPrice), 0).toFixed(2),
        maxTotalPrice: items.reduce((highSum, { highPrice }) => highSum + parseFloat(highPrice), 0).toFixed(2)
      }
    ),
    [items]
  );

  return itemPriceAggregations
}