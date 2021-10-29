import { useMemo } from 'react';

export function useBudgetStatus(budget, minPrice, maxPrice) {
  const budgetStatus = useMemo(
    () => {
      const budgetAsFloat = parseFloat(budget);
      const minPriceAsFloat = parseFloat(minPrice);
      const maxPriceAsFloat = parseFloat(maxPrice);

      if (budgetAsFloat > maxPriceAsFloat) {
        return {
          text: `$${(budgetAsFloat - maxPriceAsFloat).toFixed(2)} under budget`,
          status: "underBudget"
        };
      }

      if (budgetAsFloat < minPriceAsFloat) {
        return {
          text: `$${(minPriceAsFloat - budgetAsFloat).toFixed(2)} over budget`,
          status: "overBudget"
        };
      }

      if (minPriceAsFloat <= budgetAsFloat && budgetAsFloat <= maxPriceAsFloat) {
        return {
          text: `Budget within range`,
          status: "withinBudget"
        };
      }

      return {
        text: "",
        status: ""
      };
    },
    [budget, minPrice, maxPrice]
  );

  return budgetStatus;
}