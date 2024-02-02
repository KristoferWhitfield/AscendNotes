import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Notes from './notes';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  render(<Notes note={note} />);

  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  );

  expect(element).toBeDefined();
});
