import React from 'react';
import { BorderedContainerWithHeaderAndPromptMessage } from 'components/BorderedContainerWithHeaderAndPromptMessage';

export function SelectedItemsList({ renderBudgetPrompt, items = [], onRemoveClick = () => 0 }) {
  return (
    <BorderedContainerWithHeaderAndPromptMessage
      headerText="Selected Items"
      renderPrompt={renderBudgetPrompt}
      promptText="Enter your budget above to begin selecting items"
    >
      <div>
        <div>
          <p>Item name</p>
          <p>Type</p>
          <p>Min price</p>
          <p>Max price</p>
        </div>
        <ul>
          {
            items.map((item, index) => (
              <li
                key={`selected-item-list-${item.name}-${index}`}
              >
                <button
                  onClick={(item) => onRemoveClick(item)}
                >
                  Remove
                </button>
                <p>{item.name}</p>
                <p>{item.type}</p>
                <p>{item.lowPrice}</p>
                <p>{item.highPrice}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </BorderedContainerWithHeaderAndPromptMessage>
  );
}