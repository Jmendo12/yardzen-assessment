import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
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