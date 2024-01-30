import { useState } from 'react'

function App() {
  const testNote = {
    id: 0,
    text: "This is a test note",
    importance: false
  }

  const [notes, setNotes] = useState([testNote])
  const [newNote, setNewNote] = useState('')


  const changeId = () => {
    const noteId = !notes.length ? 0 : notes.length + 1  
    return noteId  
  }

  function addNewNote(e){
    e.preventDefault()

    //Set up new note object
    const noteObject = {
      id: changeId(),
      text: newNote,
      important: false
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  return (
    <div>
      <h1>Ascend Notes</h1>
      <form onSubmit={(e) => addNewNote(e)}>
        <input 
          value={newNote}
          required
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type='submit'>Add</button>
      </form>
      <hr />
      <ul>
        {notes.map(note => 
          <p key={note.id}>{note.text}</p>
        )}
      </ul>
    </div>
  )
}

export default App


