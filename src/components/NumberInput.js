import React from 'react';

export function NumberInput({ id = "", labelText = "", value = 0, onChange = () => 0 }) {
  return (
    <div>
      <label htmlFor={id}>
        {labelText}
      </label>
      <input
        type="number"
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}