import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {store} from "./redux/store";

test('renders learn react link', () => {
  render(<App
    state={store.getState()}
    updateNewPostText={store.updateNewPostText}
    addPost={store.addPost}
    updateNewMessageText={store.updateNewMessageText}
    addMessage={store.addMessage}
  />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
