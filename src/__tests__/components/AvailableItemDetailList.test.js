import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import { AvailableItemDetailList } from 'components/AvailableItemDetailList';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<AvailableItemDetailList />, div);
});

it('renders with the given summary text', () => {
  const { getByText } = render(<AvailableItemDetailList summaryText="test" />);

  expect(getByText("test")).toBeInTheDocument();
});

it('renders the correct headings', () => {
  const { getByText } = render(<AvailableItemDetailList />);

  expect(getByText(/include/i)).toHaveTextContent("Include in design");

  expect(getByText(/name/i)).toHaveTextContent("Item name");

  expect(getByText(/min/i)).toHaveTextContent("Min value");

  expect(getByText(/max/i)).toHaveTextContent("Max value");
});

it('displays the name, minimum value, and maximum value for the items', () => {
  const { getByText } = render(
    <AvailableItemDetailList
      items={[
        {
          name: "test",
          lowPrice: "100",
          highPrice: "1000"
        },
        {
          name: "second test",
          lowPrice: "50",
          highPrice: "250"
        }
      ]}
    />
  );

  expect(getByText("test")).toBeInTheDocument();
  expect(getByText("100")).toBeInTheDocument();
  expect(getByText("1000")).toBeInTheDocument();

  expect(getByText("second test")).toBeInTheDocument();
  expect(getByText("50")).toBeInTheDocument();
  expect(getByText("250")).toBeInTheDocument();
});

it('displays a radio input to select an item for a group', () => {
  const { getByLabelText } = render(
    <AvailableItemDetailList
      summaryText="group"
      items={[
        {
          name: "test",
          lowPrice: "100",
          highPrice: "1000"
        },
        {
          name: "second test",
          lowPrice: "50",
          highPrice: "250"
        }
      ]}
    />
  );

  expect(getByLabelText("test")).toHaveAttribute('type', 'radio');
  expect(getByLabelText("test")).toHaveAttribute('name', 'group');

  expect(getByLabelText("second test")).toHaveAttribute('type', 'radio');
  expect(getByLabelText("second test")).toHaveAttribute('name', 'group');
});

it('responds to change events on the radio input', () => {
  const onItemSelected = jest.fn();

  const { getByLabelText } = render(
    <AvailableItemDetailList
      summaryText="group"
      items={[
        {
          name: "test",
          lowPrice: "100",
          highPrice: "1000"
        }
      ]}
      onItemSelected={onItemSelected}
    />
  );

  fireEvent.click(getByLabelText("test"));

  expect(onItemSelected).toHaveBeenCalled();
});