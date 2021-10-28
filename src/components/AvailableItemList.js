import React, { useMemo } from 'react';
import { BorderedContainerWithHeaderAndPromptMessage } from 'components/BorderedContainerWithHeaderAndPromptMessage';
import { AvailableItemDetailList } from 'components/AvailableItemDetailList';

export function AvailableItemList({ renderBudgetPrompt, items = [], onItemSelected = () => 0 }) {
  /*
    We'll first get an array of all types with duplicates, and then filter it so there are no duplicates.
    We use an array instead of a set because we still need to map the types to components.
  */
  const itemTypes = useMemo(
    () => (
      items.map(item => item.type).filter((itemType, index, itemTypes) => itemTypes.indexOf(itemType) === index)
    ),
    [items]
  );

  return (
    <BorderedContainerWithHeaderAndPromptMessage
      headerText="Available Items"
      renderPrompt={renderBudgetPrompt}
      promptText="Enter your budget above to begin selecting items"
    >
      {
        itemTypes.map((type, index) => (
          <AvailableItemDetailList
            summaryText={type}
            key={`item-detail-${type}-${index}`}
            items={items.filter(item => item.type === type)}
            onItemSelected={(e) => onItemSelected(e)}
          />
        ))
      }
    </BorderedContainerWithHeaderAndPromptMessage>
  );
}