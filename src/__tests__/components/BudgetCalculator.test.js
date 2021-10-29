import React from 'react';
import ReactDOM from 'react-dom';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import { BudgetCalculator } from 'components/BudgetCalculator';
import { useItems } from 'hooks/useItems';

jest.mock('hooks/useItems');

const useItemsMockValue = (items = []) => ([...items]);

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
});

it('displays the item types of the items retrieved', async () => {
  useItems.mockReturnValue(useItemsMockValue([
    {
      type: 'test'
    },
    {
      type: 'test2'
    }
  ]));

  const { getByText, getByLabelText } = render(<BudgetCalculator />);

  act(() => {
    fireEvent.change(getByLabelText(/enter your budget below/i), { target: { value: 1200 } });
  });

  await waitFor(() => expect(getByText('test')).toBeInTheDocument());
  await waitFor(() => expect(getByText('test2')).toBeInTheDocument());
});

it('displays the name, low price, and high price of the items retrieved', async () => {
  useItems.mockReturnValue(useItemsMockValue([
    {
      type: 'test',
      name: 'name1',
      lowPrice: "10.00",
      highPrice: "15.00"
    },
    {
      type: 'test2',
      name: 'name2',
      lowPrice: "20.00",
      highPrice: "25.00"
    }
  ]));

  const { getByText, getByLabelText } = render(<BudgetCalculator />);

  act(() => {
    fireEvent.change(getByLabelText(/enter your budget below/i), { target: { value: 1200 } });
  });

  await waitFor(() => expect(getByText('name1')).toBeInTheDocument());
  await waitFor(() => expect(getByText('$10.00')).toBeInTheDocument());
  await waitFor(() => expect(getByText('$15.00')).toBeInTheDocument());


  await waitFor(() => expect(getByText('name2')).toBeInTheDocument());
  await waitFor(() => expect(getByText('$20.00')).toBeInTheDocument());
  await waitFor(() => expect(getByText('$25.00')).toBeInTheDocument());
});

it('allows the user to select an item', async () => {
  useItems.mockReturnValue(useItemsMockValue([
    {
      type: 'test',
      name: 'name1',
      lowPrice: "10.00",
      highPrice: "15.00"
    },
  ]));

  const { getByText, getByLabelText } = render(<BudgetCalculator />);

  act(() => {
    fireEvent.change(getByLabelText(/enter your budget below/i), { target: { value: 1200 } });
  });

  await waitFor(() => expect(getByText('name1')).toBeInTheDocument());

  fireEvent.click(getByLabelText(/name1/));

  expect(getByLabelText(/name1/)).toBeChecked();
});

it('allows only one item of a type to be selected', async () => {
  useItems.mockReturnValue(useItemsMockValue([
    {
      type: 'test',
      name: 'name1',
      lowPrice: "10.00",
      highPrice: "15.00"
    },
    {
      type: 'test',
      name: 'name2',
      lowPrice: "20.00",
      highPrice: "25.00"
    }
  ]));

  const { getByText, getByLabelText } = render(<BudgetCalculator />);

  act(() => {
    fireEvent.change(getByLabelText(/enter your budget below/i), { target: { value: 1200 } });
  });

  await waitFor(() => expect(getByText('name1')).toBeInTheDocument());

  fireEvent.click(getByLabelText(/name1/));

  expect(getByLabelText(/name1/)).toBeChecked();

  fireEvent.click(getByLabelText(/name2/));

  expect(getByLabelText(/name1/)).not.toBeChecked();

  expect(getByLabelText(/name2/)).toBeChecked();
});

it('selected an item places it into the selected item list', async () => {
  useItems.mockReturnValue(useItemsMockValue([
    {
      type: 'test',
      name: 'name1',
      lowPrice: "10.00",
      highPrice: "15.00"
    },
  ]));

  const { getByText, getByLabelText } = render(<BudgetCalculator />);

  act(() => {
    fireEvent.change(getByLabelText(/enter your budget below/i), { target: { value: 1200 } });
  });

  await waitFor(() => expect(getByText('name1')).toBeInTheDocument());

  fireEvent.click(getByLabelText(/name1/));

  /* 
    Check for the remove button because each item in the selected item list will render a remove button,
    and checking by the text is inconsistent since the text already exists in the available item list
  */
  await waitFor(() => expect(getByText('Remove')).toBeInTheDocument());
});

it('clicking the remove button removes the item from the selected item list', async () => {
  useItems.mockReturnValue(useItemsMockValue([
    {
      type: 'test',
      name: 'name1',
      lowPrice: "10.00",
      highPrice: "15.00"
    },
  ]));

  const { getByText, getByLabelText, queryByText } = render(<BudgetCalculator />);

  act(() => {
    fireEvent.change(getByLabelText(/enter your budget below/i), { target: { value: 1200 } });
  });

  await waitFor(() => expect(getByText('name1')).toBeInTheDocument());

  fireEvent.click(getByLabelText(/name1/));

  await waitFor(() => expect(getByText('Remove')).toBeInTheDocument());

  fireEvent.click(getByText(/remove/i));

  expect(queryByText(/remove/i)).not.toBeInTheDocument();
});

it('displays the users budget status', async () => {
  useItems.mockReturnValue(useItemsMockValue([
    {
      type: 'test',
      name: 'name1',
      lowPrice: "10.00",
      highPrice: "15.00"
    },
  ]));

  const { getByText, getByLabelText } = render(<BudgetCalculator />);

  act(() => {
    fireEvent.change(getByLabelText(/enter your budget below/i), { target: { value: 20 } });
  });

  await waitFor(() => expect(getByText('name1')).toBeInTheDocument());

  fireEvent.click(getByLabelText(/name1/));

  await waitFor(() => expect(getByText('$5.00 under budget')).toBeInTheDocument());
});