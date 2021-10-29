import React from 'react';
import styled from 'styled-components';
import { useItemTypes } from 'hooks/useItemTypes';
import { BorderedContainerWithHeaderAndPromptMessage } from 'components/BorderedContainerWithHeaderAndPromptMessage';
import { AvailableItemDetailList } from 'components/AvailableItemDetailList';

const Container = styled.div`
  max-height: 750px;
  overflow-y: auto;
`;

export function AvailableItemList({ renderBudgetPrompt, items = [], onItemSelected = () => 0 }) {
  const itemTypes = useItemTypes(items);

  return (
    <BorderedContainerWithHeaderAndPromptMessage
      headerText="Available Items"
      renderPrompt={renderBudgetPrompt}
      promptText="Enter your budget above to begin selecting items"
    >
      <Container>
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
      </Container>
    </BorderedContainerWithHeaderAndPromptMessage>
  );
}