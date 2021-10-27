import React from 'react';
import { EnterBudgetMessage } from 'components/EnterBudgetMessage';

export function AvailableItemList({ renderBudgetPrompt }) {
  return (
    <div>
      <h3>Available Items</h3>
      <div>
        {
          renderBudgetPrompt && <EnterBudgetMessage />
        }
      </div>
    </div>
  )
}