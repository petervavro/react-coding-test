import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('should render home page', () => {
  render(<App />);
  const title = screen.getByText(/Peter Vavro/i);
  expect(title).toBeInTheDocument();
});