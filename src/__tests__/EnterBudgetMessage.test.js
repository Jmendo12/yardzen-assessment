import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { EnterBudgetMessage } from 'components/EnterBudgetMessage';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<EnterBudgetMessage />, div);
});

it('renders a message prompting the user to enter a value for the budget', () => {
  const { getByText } = render(<EnterBudgetMessage />);

  expect(getByText(/enter/i)).toHaveTextContent("Enter your budget above to begin selecting items");
});