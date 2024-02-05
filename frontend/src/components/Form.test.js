import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, jest, test } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import Form from './Form';

// tests whether onSubmit is called when button is clicked
test('<Form/> exists', () => {
  render(<Form />);

  const formElement = screen.getByTestId('form-element');
  expect(formElement).toBeDefined();
});

test('<Form /> updates parent state and submits', async () => {
  //This stops Error: Not implemented: HTMLFormElement.prototype.submit error from e.preventDefault
  const onSubmit = jest.fn((e) => e.preventDefault());
  const user = userEvent.setup();

  //Form needs to render before we check the element for specifics
  render(<Form onSubmit={onSubmit} />);

  const input = screen.getByPlaceholderText(/Write A Note!/);
  const sendButton = screen.getByRole('form-element');

  await user.type(input, 'testing a form...');
  await user.click(sendButton);

  expect(input).toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalled();
  //mock.calls checks the arguments passed in Form. ie it should only be onSubmit
  expect(onSubmit.mock.calls).toHaveLength(1);
  //gets the value for the input
  expect(screen.getByDisplayValue('testing a form...')).toBeInTheDocument();
});
