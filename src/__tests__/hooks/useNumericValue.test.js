import { renderHook, act } from "@testing-library/react-hooks";
import { useNumericValue } from 'hooks/useNumericValue';


it('has an initial value of 0', () => {
  const { result } = renderHook(() => useNumericValue());

  const [value] = result.current;

  expect(value).toEqual(0);
});

it('returns a function for updating the value', () => {
  const { result } = renderHook(() => useNumericValue());

  const onValueChange = result.current[1];

  expect(onValueChange).toBeDefined();
});

it('updates the value when the update function is called and passed a number', () => {
  const { result, waitFor } = renderHook(() => useNumericValue());

  const [value, onValueChange] = result.current;

  expect(value).toEqual(0);

  act(() => {
    onValueChange(12);
  });

  waitFor(() => expect(value).toEqual(12));
});

it('does not update the value when the update function is called and not passed a number', () => {
  const { result, waitFor } = renderHook(() => useNumericValue());

  const [value, onValueChange] = result.current;

  expect(value).toEqual(0);

  act(() => {
    onValueChange('test');
  });

  waitFor(() => expect(value).toEqual(0));
});