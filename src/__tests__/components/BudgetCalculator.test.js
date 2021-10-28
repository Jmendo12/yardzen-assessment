import React from 'react';
import ReactDOM from 'react-dom';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import { BudgetCalculator } from 'components/BudgetCalculator';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BudgetCalculator />, div);
});

it('renders a number input prompting the user to enter a budget', () => {
  const { getByLabelText } = render(<BudgetCalculator />);

  expect(getByLabelText(/enter your budget below/i)).toBeInTheDocument();
});

it('renders an available item list', () => {
  const { getByText } = render(<BudgetCalculator />);

  expect(getByText(/available items/i)).toBeInTheDocument();
});

it('renders a selected item list', () => {
  const { getByText } = render(<BudgetCalculator />);

  expect(getByText(/selected items/i)).toBeInTheDocument();
});

it('renders a prompt to enter a budget in the available item and selected item list', () => {
  const { getAllByText } = render(<BudgetCalculator />);

  /* 
    We check for a length of two because there should be two message displayed - one in the available item list, and the other
    in the selected item list.
  */
  expect(getAllByText(/enter your budget above/i)).toHaveLength(2);
});

it('allows the user to enter a value for the budget', () => {
  const { getByLabelText } = render(<BudgetCalculator />);

  act(() => {
    fireEvent.change(getByLabelText(/enter your budget below/i), { target: { value: 1200 } });
  });

  expect(getByLabelText(/your budget/i)).toHaveDisplayValue(1200);
});

it('does not allow the user to enter a value less than zero for the budget', () => {
  const { getByLabelText } = render(<BudgetCalculator />);

  act(() => {
    fireEvent.change(getByLabelText(/enter your budget below/i), { target: { value: -99 } });
  });

  // We test for the attribute here instead of the value, because the min attribute will enforce this minimum value.
  expect(getByLabelText(/your budget/i)).toHaveAttribute('min', '0');
});

it('the enter budget prompts disappear when a value is entered for the budget', async () => {
  const { getByLabelText, queryByText } = render(<BudgetCalculator />);

  act(() => {
    fireEvent.change(getByLabelText(/enter your budget below/i), { target: { value: 1200 } });
  });

  await waitFor(() => expect(queryByText(/begin selecting items/i)).not.toBeInTheDocument());
});

it('the budget input label changes when a budget is enter', async () => {
  const { getByLabelText, getByText } = render(<BudgetCalculator />);

  act(() => {
    fireEvent.change(getByLabelText(/enter your budget below/i), { target: { value: 1200 } });
  });

  await waitFor(() => expect(getByText("Your budget:")).toBeInTheDocument());
})