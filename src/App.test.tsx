import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {store} from "./redux/store";

test('renders learn react link', () => {
  render(<App
    state={store.getState()}
    dispatch={store.dispatch.bind(store)}
  />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
