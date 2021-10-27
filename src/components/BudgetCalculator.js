import React from 'react';
import styled from 'styled-components';
import { NumberInput } from 'components/NumberInput';
import { AvailableItemList } from 'components/AvailableItemList';
import { SelectedItemsList } from 'components/SelectedItemsList';

const MainContainer = styled.main`
  display: grid;
  grid-template-rows: 65px 1fr;
  row-gap: 20px;
  height: 100%;
  padding: 40px;
`;

const ListsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  column-gap: 20px;
`;

export function BudgetCalculator() {
  return (
    <MainContainer>
      <NumberInput
        labelText="Enter your budget below to get started:"
        id="budgetNumberInput"
      />
      <ListsContainer>
        <AvailableItemList renderBudgetPrompt />
        <SelectedItemsList renderBudgetPrompt />
      </ListsContainer>
    </MainContainer>
  )
}