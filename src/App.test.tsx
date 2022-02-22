import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {addMessage, addPost, state} from "./redux/state";

test('renders learn react link', () => {
  render(<App state={state} addPostCallback={addPost} addMessageCallback={addMessage}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
