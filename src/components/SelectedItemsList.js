import React from 'react';
import { EnterBudgetMessage } from 'components/EnterBudgetMessage';

export function SelectedItemsList({ renderBudgetPrompt }) {
  return (
    <div>
      <h3>Selected Items</h3>
      <div>
        {
          renderBudgetPrompt && <EnterBudgetMessage />
        }
      </div>
    </div>
  );
}