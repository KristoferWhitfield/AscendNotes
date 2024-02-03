import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Notes from './Notes';

test('toggles importance state', () => {
  const onToggleMock = jest.fn();

  const note = { id: 1, content: 'Some content', important: false };

  render(<Notes note={note} toggleImportant={onToggleMock} />);

  expect(screen.getByTestId('icon-unImportant')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('change-importance'));

  expect(screen.getByTestId('icon-important')).toBeInTheDocument();

  expect(onToggleMock).toHaveBeenCalledWith(note.id);
});
