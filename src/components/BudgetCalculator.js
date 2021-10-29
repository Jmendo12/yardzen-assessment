import React from 'react';
import styled from 'styled-components';
import { useNumericValue } from 'hooks/useNumericValue';
import { useItems } from 'hooks/useItems';
import { useSelectedItems } from 'hooks/useSelectedItems';
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
  const [userBudget, setUserBudget] = useNumericValue();

  const items = useItems();

  const [selectedItems, addItem, removeItemOfType, removeItemByName] = useSelectedItems();

  const budgetLabelText = userBudget
    ? "Your budget:"
    : "Enter your budget below to get started:"

  const onAvailableItemSelected = ({ target }) => {
    const itemToAdd = JSON.parse(target.value);

    // We must remove any other item with this type since only one item of a type can be selected at once.
    removeItemOfType(itemToAdd.type);

    addItem(itemToAdd);
  }

  return (
    <MainContainer>
      <NumberInput
        labelText={budgetLabelText}
        id="budgetNumberInput"
        value={userBudget}
        onChange={({ target }) => setUserBudget(target.value)}
        minValue={0}
      />
      <ListsContainer>
        <AvailableItemList
          renderBudgetPrompt={!userBudget}
          items={items}
          onItemSelected={onAvailableItemSelected}
        />
        <SelectedItemsList
          renderBudgetPrompt={!userBudget}
          budget={userBudget}
          items={selectedItems}
          onRemoveClick={({ name }) => removeItemByName(name)}
        />
      </ListsContainer>
    </MainContainer>
  )
}