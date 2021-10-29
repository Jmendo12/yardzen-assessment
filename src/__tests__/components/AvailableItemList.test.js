import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
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

it('displays heading for each available item type', () => {
  const { getByText } = render(
    <AvailableItemList
      items={[
        {
          type: "chairs",
        },
        {
          type: "lighting"
        }
      ]}
    />
  );

  expect(getByText("chairs")).toBeInTheDocument();

  expect(getByText("lighting")).toBeInTheDocument();
});

it('displays a list of all available items for each type', () => {
  const { getByText } = render(
    <AvailableItemList
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
  expect(getByText("$100")).toBeInTheDocument();
  expect(getByText("$1000")).toBeInTheDocument();

  expect(getByText("second test")).toBeInTheDocument();
  expect(getByText("$50")).toBeInTheDocument();
  expect(getByText("$250")).toBeInTheDocument();
});

it('fires the geven select function when an item is selected', () => {
  const onItemSelected = jest.fn();

  const { getByLabelText } = render(
    <AvailableItemList
      items={[
        {
          name: "test",
          lowPrice: "100",
          highPrice: "1000",
          type: "chairs"
        }
      ]}
      onItemSelected={onItemSelected}
    />
  );

  fireEvent.click(getByLabelText("test"));

  expect(onItemSelected).toHaveBeenCalled();
});

