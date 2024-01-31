import { FaTrashAlt } from "react-icons/fa";
import { TiPin, TiPinOutline } from "react-icons/ti";

function Notes({note, toggleImportant, updateNote, deleteNote }) {
  const noteStyle = {
    fontSize: `${note.important ? '22px' : '18px'}`
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
    visibility: `${note.important ? 'hidden' : 'visible'}`
  }

  return (
    <>
      <div style={displayStyle}>
      {
        note.important ? (
          <TiPin 
            style={elementStyle} 
            onClick={toggleImportant}
          />
        ) :
        (
          <TiPinOutline 
            style={elementStyle} 
            onClick={toggleImportant}
          />
        )
      }
        <p style={noteStyle}>
          {note.text}
        </p>
      </div>
      <div style={secondaryDivStyle}>
        <button onClick={updateNote}>Update</button>
        <FaTrashAlt style={deleteStyle} onClick={deleteNote} />
      </div>
    </>
  )
}

export default Notes;