import React from 'react';
import { BorderedContainerWithHeaderAndPromptMessage } from 'components/BorderedContainerWithHeaderAndPromptMessage';

export function SelectedItemsList({ renderBudgetPrompt }) {
  return (
    <BorderedContainerWithHeaderAndPromptMessage
      headerText="Selected Items"
      renderPrompt={renderBudgetPrompt}
      promptText="Enter your budget above to begin selecting items"
    />
  );
}