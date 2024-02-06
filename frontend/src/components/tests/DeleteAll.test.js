import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

beforeEach(() => {
  global.confirm = jest.fn();
});

test('Delete all button exists and deletes all notes', async () => {
  global.confirm.mockReturnValueOnce(true);

  const removeAllMock = jest.fn();

  render(<App deleteAllNotes={removeAllMock} />);
  const deleteAllIcon = screen.getByTestId('deleteAll-icon');

  await fireEvent.click(deleteAllIcon);

  expect(deleteAllIcon).toBeInTheDocument();
  expect(removeAllMock).toHaveBeenCalled();

  jest.restoreAllMocks();
});
