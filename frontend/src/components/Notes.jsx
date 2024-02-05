import { FaTrashAlt } from "react-icons/fa";
import { TiPin, TiPinOutline } from "react-icons/ti";
import { FaPencilAlt } from "react-icons/fa";
import Card from 'react-bootstrap/Card'
import './Notes.css'

function Notes({note, important, toggleImportant, updateNote, deleteNote, deactivate}) {

  return (
    <div className="cardContainer">
      <div className="noteContainer">
        <Card className="noteCard" style={{ width: '20rem'}}>
          <div data-testid="change-importance" onClick={toggleImportant} >
            {important ? (
              <TiPin role="icon-important" className="pinStyle" />
            ) : (
              <TiPinOutline role="icon-unImportant" className="pinStyle" />
            )}
          </div>
          <Card.Body>
            <Card.Text className="noteStyle">
              {note.content}
            </Card.Text>
          </Card.Body>
        <div className="updateDeleteContainer">
          <FaPencilAlt 
            data-testid="update-button" 
            onClick={() => updateNote(note.id)} 
            disabled={deactivate}
            className="hoverMode"
          >
          </FaPencilAlt>
          <div>
            <FaTrashAlt
              data-testid="delete-icon"
              style={{ visibility: important ? 'hidden' : 'visible' }} 
              onClick={() => deleteNote(note.id)}
              className="hoverMode" 
            />
          </div>
        </div>
      </Card>
      </div>
    </div>
  )
}

export default Notes;