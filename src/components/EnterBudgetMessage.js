import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Message = styled.p`
  margin: auto;
`;

export function EnterBudgetMessage() {
  return (
    <Container>
      <Message>Enter your budget above to begin selecting items</Message>
    </Container>
  );
}