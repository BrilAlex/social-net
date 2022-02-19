import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {dialogs, messages, posts} from "./index";

test('renders learn react link', () => {
  render(<App posts={posts} dialogs={dialogs} messages={messages}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
