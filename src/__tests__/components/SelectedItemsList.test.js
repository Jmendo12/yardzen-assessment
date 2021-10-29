import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
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

it('displays headings for the selected item information', () => {
  const { getByText } = render(<SelectedItemsList />);

  expect(getByText(/name/i)).toHaveTextContent("Item name");

  expect(getByText("Type")).toBeInTheDocument();

  expect(getByText(/min price/i)).toHaveTextContent("Min price");

  expect(getByText(/max price/i)).toHaveTextContent("Max price");
});

it('displays the name, type, and price information for each item', () => {
  const { getByText } = render(
    <SelectedItemsList
      items={[
        {
          name: "test",
          lowPrice: "100",
          highPrice: "1000",
          type: "chairs"
        },
        {
          name: "second test",
          lowPrice: "50",
          highPrice: "250",
          type: "sofas"
        }
      ]}
    />
  );

  expect(getByText("test")).toBeInTheDocument();
  expect(getByText("chairs")).toBeInTheDocument();
  expect(getByText("$100")).toBeInTheDocument();
  expect(getByText("$1000")).toBeInTheDocument();

  expect(getByText("second test")).toBeInTheDocument();
  expect(getByText("sofas")).toBeInTheDocument();
  expect(getByText("$50")).toBeInTheDocument();
  expect(getByText("$250")).toBeInTheDocument();
});

it('displays a remove button for each item', () => {
  const { getAllByText } = render(
    <SelectedItemsList
      items={[
        {
          name: "test",
          lowPrice: "100",
          highPrice: "1000",
          type: "chairs"
        },
        {
          name: "second test",
          lowPrice: "50",
          highPrice: "250",
          type: "sofas"
        }
      ]}
    />
  );

  expect(getAllByText(/remove/i)).toHaveLength(2);
});

it('the remove button fires the given event when clicked', () => {
  const onRemoveClick = jest.fn();

  const { getByText } = render(
    <SelectedItemsList
      items={[
        {
          name: "test",
          lowPrice: "100",
          highPrice: "1000",
          type: "chairs"
        }
      ]}
      onRemoveClick={onRemoveClick}
    />
  );

  fireEvent.click(getByText(/remove/i));

  expect(onRemoveClick).toHaveBeenCalled();
});

it('displays headings for aggregated item pricing and budget information', () => {
  const { getByText } = render(<SelectedItemsList />);

  expect(getByText(/item count/i)).toBeInTheDocument();

  expect(getByText("Budget")).toBeInTheDocument();

  expect(getByText(/min total price/i)).toBeInTheDocument();

  expect(getByText(/max total price/i)).toBeInTheDocument();

  expect(getByText(/budget status/i)).toBeInTheDocument();
});

it('displays an aggregated item count, budget information, and aggregated pricing information', () => {
  const { getByText } = render(
    <SelectedItemsList
      items={[
        {
          name: "test",
          lowPrice: 100,
          highPrice: 1000,
          type: "chairs"
        },
        {
          name: "second test",
          lowPrice: 50,
          highPrice: 250,
          type: "sofas"
        }
      ]}
      budget={10000}
    />
  );

  expect(getByText("2")).toBeInTheDocument();

  expect(getByText("$150")).toBeInTheDocument();

  expect(getByText("$1250")).toBeInTheDocument();

  expect(getByText("$10000")).toBeInTheDocument();
});

it('displays a message indicating the user is under budget', () => {
  const { getByText } = render(
    <SelectedItemsList
      items={[
        {
          name: "test",
          lowPrice: 100,
          highPrice: 1000,
          type: "chairs"
        },
        {
          name: "second test",
          lowPrice: 50,
          highPrice: 250,
          type: "sofas"
        }
      ]}
      budget={2000}
    />
  );

  expect(getByText(/under budget/i)).toHaveTextContent("$750 under budget");

  expect(getByText(/under budget/i)).toHaveStyle('color: green');
});

it('renders a message indicating the user is over budget', () => {
  const { getByText } = render(
    <SelectedItemsList
      items={[
        {
          name: "test",
          lowPrice: 100,
          highPrice: 1000,
          type: "chairs"
        },
        {
          name: "second test",
          lowPrice: 50,
          highPrice: 250,
          type: "sofas"
        }
      ]}
      budget={100}
    />
  );

  expect(getByText(/over budget/i)).toHaveTextContent("$50 over budget");

  expect(getByText(/over budget/i)).toHaveStyle('color: red');
});