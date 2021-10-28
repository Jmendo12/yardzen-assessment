import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { BorderedContainerWithHeaderAndPromptMessage } from 'components/BorderedContainerWithHeaderAndPromptMessage';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<BorderedContainerWithHeaderAndPromptMessage />, div);
});

it('renders the given header text', () => {
  const { getByText } = render(<BorderedContainerWithHeaderAndPromptMessage headerText="test" />);

  expect(getByText("test")).toBeInTheDocument();
});

it('renders the given prompt text when flagged to', () => {
  const { getByText } = render(<BorderedContainerWithHeaderAndPromptMessage promptText="prompt" renderPrompt />);

  expect(getByText("prompt")).toBeInTheDocument();
});

it('renders the passed in child components when not rendering a prompt', () => {
  const { queryByText, getByText } = render(
    <BorderedContainerWithHeaderAndPromptMessage
      promptText="prompt"
    >
      <p>Test</p>
    </BorderedContainerWithHeaderAndPromptMessage>
  );

  expect(queryByText("prompt")).not.toBeInTheDocument();

  expect(getByText("Test")).toBeInTheDocument();
});
