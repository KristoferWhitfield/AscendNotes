import { useState } from 'react'

function App() {
  //todo set up basic react with test note
  //create form
  //create components
  //add like and save functionality

  const testNote = {
    id: 0,
    text: "This is a test note",
    importance: false
  }

  const [notes, setNotes] = useState([testNote])
  const [newNote, setnewNote] = useState('')

  function addNewNote(e){
    e.preventDefault()

    console.log('new note added')
  }

  return (
    <div>
      <h1>Notes App</h1>
      <form onSubmit={(e) => addNewNote(e)}>
        <input value={}/>
        <button type='submit'>Add</button>
      <hr />
      </form>
      <ul>
        {notes.map(note => 
          <p key={note.id}>{note.text}</p>
        )}
      </ul>
      <div>
        Click here to save a note!
      </div>
    </div>
  )
}

export default App


