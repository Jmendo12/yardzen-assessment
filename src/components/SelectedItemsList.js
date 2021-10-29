import React from 'react';
import { useItemPriceAggregations } from 'hooks/useItemPriceAggregations';
import { useBudgetStatus } from 'hooks/useBudgetStatus';
import styled from 'styled-components';
import { BorderedContainerWithHeaderAndPromptMessage } from 'components/BorderedContainerWithHeaderAndPromptMessage';

const BudgetStatusMsg = styled.p`
  color: ${props => props.status === 'overBudget' ? 'red' : 'green'}
`;

const HeadingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  padding-left: 125px;
`;

const SelectedItem = styled.li`
  display: grid;
  grid-template-columns: 75px repeat(4, 1fr);
  column-gap: 10px;
  align-items: center;
  list-type: none;
`;

const AggregateInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr) 175px;
  column-gap: 10px;
  align-self: end;
  padding: 0px 40px;
  border-top: 1px solid #000;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
`

export function SelectedItemsList({ renderBudgetPrompt, items = [], onRemoveClick = () => 0, budget = 0 }) {

  const aggregateItemInformation = useItemPriceAggregations(items);

  const budgetStatus = useBudgetStatus(budget, aggregateItemInformation.minTotalPrice, aggregateItemInformation.maxTotalPrice);

  return (
    <BorderedContainerWithHeaderAndPromptMessage
      headerText="Selected Items"
      renderPrompt={renderBudgetPrompt}
      promptText="Enter your budget above to begin selecting items"
    >
      <Container>
        <HeadingsContainer>
          <h4>Item name</h4>
          <h4>Type</h4>
          <h4>Min price</h4>
          <h4>Max price</h4>
        </HeadingsContainer>
        <ul>
          {
            items.map((item, index) => (
              <SelectedItem
                key={`selected-item-list-${item.name}-${index}`}
              >
                <button
                  onClick={() => onRemoveClick(item)}
                >
                  Remove
                </button>
                <p>{item.name}</p>
                <p>{item.type}</p>
                <p>${item.lowPrice}</p>
                <p>${item.highPrice}</p>
              </SelectedItem>
            ))
          }
        </ul>
        <AggregateInfoContainer>
          <h4>Item count</h4>
          <h4>Min total price</h4>
          <h4>Max total price</h4>
          <h4>Budget</h4>
          <h4>Budget Status</h4>
          <p>{aggregateItemInformation.itemCount}</p>
          <p>${aggregateItemInformation.minTotalPrice}</p>
          <p>${aggregateItemInformation.maxTotalPrice}</p>
          <p>${budget}</p>
          <BudgetStatusMsg
            status={budgetStatus.status}
          >
            {budgetStatus.text}
          </BudgetStatusMsg>
        </AggregateInfoContainer>
      </Container>
    </BorderedContainerWithHeaderAndPromptMessage>
  );
}