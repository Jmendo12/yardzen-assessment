import React from 'react';
import { NumberInput } from 'components/NumberInput';
import { AvailableItemList } from 'components/AvailableItemList';
import { SelectedItemsList } from 'components/SelectedItemsList';

export function BudgetCalculator() {
  return (
    <main>
      <NumberInput
        labelText="Enter your budget below to get started"
        id="budgetNumberInput"
      />
      <div>
        <AvailableItemList renderBudgetPrompt />
        <SelectedItemsList renderBudgetPrompt />
      </div>
    </main>
  )
}