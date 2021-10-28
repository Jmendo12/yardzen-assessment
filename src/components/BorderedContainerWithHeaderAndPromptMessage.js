import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`

const BorderedContainer = styled.div`
  border: 1px solid #000;
  border-radius: 4px;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export function BorderedContainerWithHeaderAndPromptMessage({ headerText = "", promptText = "", renderPrompt, children }) {
  return (
    <Container>
      <h3>{headerText}</h3>
      <BorderedContainer>
        {
          renderPrompt && (
            <MessageContainer>
              <p>{promptText}</p>
            </MessageContainer>
          )
        }
        {
          !renderPrompt && (
            <>
              {children}
            </>
          )
        }
      </BorderedContainer>
    </Container>
  );
}