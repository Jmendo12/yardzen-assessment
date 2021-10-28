import { useState } from 'react';

export function useNumericValue() {
  const [value, setValue] = useState(0);

  const onValueChange = (value) => {
    if (isNaN(parseInt(value))) {
      return;
    }

    setValue(parseInt(value));
  }

  return [value, onValueChange];
}