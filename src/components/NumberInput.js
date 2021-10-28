import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  row-gap: 10px;
  column-gap: 5px;
`;

const Label = styled.label`
  grid-column: span 2;
`;

const DollarSign = styled.p`
  margin: 0;
  align-self: center;
`;

const Input = styled.input`
  width: 250px;
  padding: 5px;
  font-size: 1em;
`;

export function NumberInput({ id = "", labelText = "", value = 0, minValue, onChange = () => 0 }) {
  return (
    <Container>
      <Label htmlFor={id}>
        {labelText}
      </Label>
      <DollarSign>$</DollarSign>
      <Input
        type="number"
        id={id}
        value={value}
        onChange={(e) => onChange(e)}
        min={minValue}
      />
    </Container>
  );
}