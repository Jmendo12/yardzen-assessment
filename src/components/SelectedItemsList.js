import React from 'react';
import { useItemPriceAggregations } from 'hooks/useItemPriceAggregations';
import { useBudgetStatus } from 'hooks/useBudgetStatus';
import styled from 'styled-components';
import { BorderedContainerWithHeaderAndPromptMessage } from 'components/BorderedContainerWithHeaderAndPromptMessage';

const BudgetStatusMsg = styled.p`
  color: ${props => props.status === 'overBudget' ? 'red' : 'green'}
`;

export function SelectedItemsList({ renderBudgetPrompt, items = [], onRemoveClick = () => 0, budget = 0 }) {

  const aggregateItemInformation = useItemPriceAggregations(items);

  const budgetStatus = useBudgetStatus(budget, aggregateItemInformation.minTotalPrice, aggregateItemInformation.maxTotalPrice);

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
                <p>${item.lowPrice}</p>
                <p>${item.highPrice}</p>
              </li>
            ))
          }
        </ul>
        <div>
          <div>
            <p>Item count</p>
            <p>Min total price</p>
            <p>Max total price</p>
            <p>Budget</p>
            <p>Budget Status</p>
            <p>{aggregateItemInformation.itemCount}</p>
            <p>${aggregateItemInformation.minTotalPrice}</p>
            <p>${aggregateItemInformation.maxTotalPrice}</p>
            <p>${budget}</p>
            <BudgetStatusMsg
              status={budgetStatus.status}
            >
              {budgetStatus.text}
            </BudgetStatusMsg>
          </div>
        </div>
      </div>
    </BorderedContainerWithHeaderAndPromptMessage>
  );
}