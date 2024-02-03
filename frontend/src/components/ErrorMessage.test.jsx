import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

test('renders error message when provided', () => {
  const message = 'Error!';

  render(<ErrorMessage message={message} />);

  const errorMessage = screen.getByText(`Error: ${message}`);
  const errorIcon = screen.getByTestId('error-icon');

  expect(errorMessage).toBeInTheDocument();
  expect(errorIcon).toBeInTheDocument();
});

test('does not render error message when not provided', () => {
  const { container } = render(<ErrorMessage message={null} />);

  // make sure the error method isnt rendered
  expect(container.firstChild).toBeNull();
});
