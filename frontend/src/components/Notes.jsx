import { FaTrashAlt } from "react-icons/fa";
import { TiPin, TiPinOutline } from "react-icons/ti";
import { useState } from "react";

function Notes({note, important, toggleImportant, updateNote, deleteNote, deactivate}) {
  const [isClicked, setIsClicked] = useState(false);

  const noteStyle = {
    fontSize: `${important ? '22px' : '18px'}`
  }

  const displayStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '40px'
  }
  const elementStyle = {
    margin: '5px',
    fontSize: '20px'
  };
  const secondaryDivStyle = {
    display: 'flex',
    width: '100px',
    alignItems: 'center',
    justifyContent: 'space-around',
  }

  const deleteStyle={
    visibility: `${important ? 'hidden' : 'visible'}`
  }

  const buttonClick = () => {
    toggleImportant(note.id);

    // Update the state to reflect that the button has been clicked
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div style={displayStyle}>
        <div data-testid="change-importance" onClick={buttonClick}>
          {isClicked ? (
            <TiPin data-testid="icon-important" style={elementStyle} />
          ) : (
            <TiPinOutline data-testid="icon-unImportant" style={elementStyle} />
          )}
        </div>
        <p style={noteStyle} className="note">
          {note.content}
        </p>
      </div>
      <div style={secondaryDivStyle}>
        <button data-testid="update-button" onClick={() => updateNote(note.id)} disabled={deactivate}>Update</button>
        <div>
          <FaTrashAlt
            data-testid="delete-icon"
            style={deleteStyle} 
            onClick={() => deleteNote(note.id)} />
        </div>
      </div>
    </>
  )
}

export default Notes;