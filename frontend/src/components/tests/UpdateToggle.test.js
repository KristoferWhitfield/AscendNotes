import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Notes from '../Notes';

test('toggles importance state', async () => {
  const onToggleMock = jest.fn();

  const note = {
    id: 1,
    content: 'Some content',
    color: 'red',
    important: false,
  };

  const deleteButton = screen.queryByTestId('delete-button');

  render(<Notes note={note} toggleImportant={onToggleMock} />);

  expect(screen.getByTestId('icon-unImportant')).toBeInTheDocument();

  await fireEvent.click(screen.getByTestId('change-importance'));

  expect(screen.getByTestId('icon-important')).toBeInTheDocument();

  expect(onToggleMock).toHaveBeenCalledWith(note.id);

  expect(deleteButton).not.toBeInTheDocument();
});
