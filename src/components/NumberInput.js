import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 10px;
`;

const Input = styled.input`
  width: 250px;
  padding: 5px;
  font-size: 1em;
`;

export function NumberInput({ id = "", labelText = "", value = 0, onChange = () => 0 }) {
  return (
    <Container>
      <label htmlFor={id}>
        {labelText}
      </label>
      <Input
        type="number"
        id={id}
        value={value}
        onChange={onChange}
      />
    </Container>
  );
}