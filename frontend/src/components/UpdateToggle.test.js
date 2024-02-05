import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Notes from './Notes';

test('toggles importance state', async () => {
  const onToggleMock = jest.fn();

  const note = { id: 1, content: 'Some content', important: false };
  const deleteButton = screen.queryByTestId('delete-button');

  render(<Notes note={note} toggleImportant={onToggleMock} />);

  expect(screen.getByRole('icon-unImportant')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('change-importance'));

  expect(screen.getByRole('icon-important')).toBeInTheDocument();

  expect(onToggleMock).toHaveBeenCalledWith(note.id);

  expect(deleteButton).not.toBeInTheDocument();
});
