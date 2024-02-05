import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SuccessMessage from '../SuccessMessage';

test('renders success message when provided', () => {
  const message = 'Success!';

  render(<SuccessMessage message={message} />);

  const successMessage = screen.getByText(message);
  const successIcon = screen.getByTestId('success-icon');

  expect(successMessage).toBeInTheDocument();
  expect(successIcon).toBeInTheDocument();
});

test('does not render success message when not provided', () => {
  const { container } = render(<SuccessMessage message={null} />);

  // make sure the success method isnt rendered
  expect(container.firstChild).toBeNull();
});
