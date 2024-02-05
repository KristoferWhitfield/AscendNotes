import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Notes from '../Notes';

test('Delete button exists and updates parent state', () => {
  const onDeleteMock = jest.fn();

  const note = { id: 1, content: 'Test Note', important: false };

  render(
    <Notes
      note={note}
      important={jest.fn()}
      toggleImportant={jest.fn()}
      updateNote={jest.fn()}
      deleteNote={onDeleteMock}
      deactivate={false}
    />
  );

  const deleteIcon = screen.getByTestId('delete-icon');

  fireEvent.click(deleteIcon);

  expect(deleteIcon).toBeInTheDocument();
  expect(onDeleteMock).toHaveBeenCalledWith(note.id);
});

test('does not render delete button if important', () => {
  const onDeleteMock = jest.fn();

  const note = { id: 1, content: 'Test Note', important: true };

  render(
    <Notes
      note={note}
      toggleImportant={jest.fn()}
      updateNote={jest.fn()}
      deleteNote={onDeleteMock}
      deactivate={false}
    />
  );

  const deleteButton = screen.queryByTestId('delete-button');

  expect(deleteButton).not.toBeInTheDocument();
});
