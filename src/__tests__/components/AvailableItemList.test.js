import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { AvailableItemList } from 'components/AvailableItemList';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<AvailableItemList />, div);
});

it('renders an available items heading', () => {
  const { getByText } = render(<AvailableItemList />);

  expect(getByText(/items/i)).toHaveTextContent("Available Items");
});

it('renders a message prompting the user to enter a budget', () => {
  const { getByText } = render(<AvailableItemList renderBudgetPrompt />);

  expect(getByText(/enter your budget/i)).toBeInTheDocument();
});

