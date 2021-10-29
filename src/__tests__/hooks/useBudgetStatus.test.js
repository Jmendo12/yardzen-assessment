import { renderHook } from "@testing-library/react-hooks";
import { useBudgetStatus } from 'hooks/useBudgetStatus';

it('provides a status that shows the user is under budget', () => {
  const budget = 100;

  const minPrice = 10;

  const maxPrice = 50;

  const { result } = renderHook(() => useBudgetStatus(budget, minPrice, maxPrice));

  const budgetStatus = result.current;

  expect(budgetStatus).toHaveProperty('status', 'underBudget');
  expect(budgetStatus).toHaveProperty('text', '$50.00 under budget');
});

it('provides a status that shows the user is over their budget', () => {
  const budget = 50;

  const minPrice = 100;

  const maxPrice = 150;

  const { result } = renderHook(() => useBudgetStatus(budget, minPrice, maxPrice));

  const budgetStatus = result.current;

  expect(budgetStatus).toHaveProperty('status', 'overBudget');
  expect(budgetStatus).toHaveProperty('text', '$50.00 over budget');
});

it('provides a status that shows the user is within their budget', () => {
  const budget = 125;

  const minPrice = 100;

  const maxPrice = 150;

  const { result } = renderHook(() => useBudgetStatus(budget, minPrice, maxPrice));

  const budgetStatus = result.current;

  expect(budgetStatus).toHaveProperty('status', 'withinBudget');
  expect(budgetStatus).toHaveProperty('text', 'Budget within range');
});