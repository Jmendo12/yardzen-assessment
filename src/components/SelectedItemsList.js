import React from 'react';
import styled from 'styled-components';
import { EnterBudgetMessage } from 'components/EnterBudgetMessage';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`

const ListContainer = styled.div`
  border: 1px solid #000;
  border-radius: 4px;
`;

export function SelectedItemsList({ renderBudgetPrompt }) {
  return (
    <Container>
      <h3>Selected Items</h3>
      <ListContainer>
        {
          renderBudgetPrompt && <EnterBudgetMessage />
        }
      </ListContainer>
    </Container>
  );
}