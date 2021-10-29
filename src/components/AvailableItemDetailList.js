import React from 'react';
import styled from 'styled-components';

const Details = styled.details`
  padding: 10px 0;
`;

const Summary = styled.summary`
  padding-left: 20px;
`

const HeadingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  justify-items: center;
  padding-left: 40px;
`

const ListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  justify-items: center;
  align-items: center;
  list-style: none;
`

export function AvailableItemDetailList({ summaryText = "", items = [], onItemSelected = () => 0 }) {
  return (
    <Details>
      <Summary>{summaryText}</Summary>
      <HeadingsContainer>
        <h4>Include in design</h4>
        <h4>Item name</h4>
        <h4>Min price</h4>
        <h4>Max price</h4>
      </HeadingsContainer>
      <ul>
        {
          items.map((item, index) => {
            const itemKeyAndId = `${summaryText}-${item.name}-${index}`;

            return (
              <ListItem key={itemKeyAndId}>
                <input
                  type="radio"
                  id={itemKeyAndId}
                  name={summaryText}
                  value={JSON.stringify(item)}
                  onClick={(e) => onItemSelected(e)}
                />
                <label htmlFor={itemKeyAndId}>{item.name}</label>
                <p>${item.lowPrice}</p>
                <p>${item.highPrice}</p>
              </ListItem>
            )
          })
        }
      </ul>
    </Details>
  );
}