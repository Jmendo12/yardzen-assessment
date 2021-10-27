import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { SelectedItemsList } from 'components/SelectedItemsList';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<SelectedItemsList />, div);
});

it('renders a selected items heading', () => {
  const { getByText } = render(<SelectedItemsList />);

  expect(getByText(/items/i)).toHaveTextContent("Selected Items");
});

it('renders a message prompting the user to enter a budget', () => {
  const { getByText } = render(<SelectedItemsList renderBudgetPrompt />);

  expect(getByText(/enter your budget/i)).toBeInTheDocument();
});