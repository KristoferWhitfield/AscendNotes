import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Notes from '../Notes';

test('Update button exists and updates parent state', () => {
  const onUpdateMock = jest.fn();

  const note = { id: 1, content: 'Test Note', important: false };

  render(
    <Notes
      note={note}
      important={jest.fn()}
      toggleImportant={jest.fn()}
      updateNote={onUpdateMock}
      deleteNote={jest.fn()}
      deactivate={false}
    />
  );

  const updateButton = screen.getByTestId('update-button');

  fireEvent.click(updateButton);

  expect(updateButton).toBeInTheDocument();
  expect(onUpdateMock).toHaveBeenCalledWith(note.id);
});
