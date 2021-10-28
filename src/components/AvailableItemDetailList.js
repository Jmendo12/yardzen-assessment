import React from 'react';

export function AvailableItemDetailList({ summaryText = "", items = [], onItemSelected = () => 0 }) {
  return (
    <details>
      <summary>{summaryText}</summary>
      <div>
        <p>Include in design</p>
        <p>Item name</p>
        <p>Min price</p>
        <p>Max price</p>
      </div>
      <ul>
        {
          items.map((item, index) => {
            const itemKeyAndId = `${summaryText}-${item.name}-${index}`;

            return (
              <li key={itemKeyAndId}>
                <input
                  type="radio"
                  id={itemKeyAndId}
                  name={summaryText}
                  value={item}
                  onClick={(e) => onItemSelected(e)}
                />
                <label htmlFor={itemKeyAndId}>{item.name}</label>
                <p>{item.lowPrice}</p>
                <p>{item.highPrice}</p>
              </li>
            )
          })
        }
      </ul>
    </details>
  );
}