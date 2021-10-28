import React from 'react';
import { BorderedContainerWithHeaderAndPromptMessage } from 'components/BorderedContainerWithHeaderAndPromptMessage';

export function AvailableItemList({ renderBudgetPrompt }) {
  return (
    <BorderedContainerWithHeaderAndPromptMessage
      headerText="Available Items"
      renderPrompt={renderBudgetPrompt}
      promptText="Enter your budget above to begin selecting items"
    />
  );
}