import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import { NumberInput } from 'components/NumberInput';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<NumberInput />, div);
});

it('renders a number input with the given label text', () => {
  const { getByLabelText } = render(<NumberInput labelText="test label" id="test" />);

  expect(getByLabelText(/test/)).toHaveAttribute('type', 'number');
});

it('renders with the given value', () => {
  const { getByLabelText } = render(<NumberInput labelText="test" id="test" value={12} />);

  expect(getByLabelText(/test/)).toHaveDisplayValue(12);
});

it('fires the given event handler when changed', () => {
  const onChange = jest.fn();

  const { getByLabelText } = render(<NumberInput labelText="test" id="test" onChange={onChange} />);

  fireEvent.change(getByLabelText(/test/), { target: { value: 12 } });

  expect(onChange).toHaveBeenCalled();
});

it('allows for a minimum value to be specified', () => {
  const { getByLabelText } = render(<NumberInput labelText="test label" id="test" minValue={0} />);

  expect(getByLabelText(/test/)).toHaveAttribute('min', "0");
})