import { useState } from 'react'
import Notes from './components/Notes'
import Form from './components/Form'

function App() {
  const testNote = [
    {
      id: 1,
      text: "This is a test note",
      important: false
    }, 
    {
      id: 2,
      text: "This is a test note2",
      important: false
    }, 
    {
      id: 3,
      text: "This is a test note3",
      important: false
    }, 
    {
      id: 4,
      text: "This is a test note4",
      important: false
    }, 
    
    ]

  const [notes, setNotes] = useState(testNote)
  const [newNote, setNewNote] = useState('')
  const [important, setImportant] = useState(false)


  const changeId = () => {
    const noteId = !notes.length ? 0 : notes.length + 1  
    return noteId  
  }

  const addNewNote = (e) => {
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

  const handleOnChange = (e) => {
    setNewNote(e.target.value)
  }


  const toggleImportant = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = {...note, important: !note.important}

    setNotes(notes.map(n => n.id !== id ? n : changedNote))
    console.log(changedNote)
  }
  
  return (
    <div>
      <h1>Ascend Notes</h1>
      <Form 
        onSubmit={addNewNote} 
        value={newNote} 
        onChange={handleOnChange}
      />
      <hr />
      <ul>
      {notes.map(note => 
        <Notes 
          key={note.id} 
          text={note.text} 
          toggleImportant={() => toggleImportant(note.id)} 
          style={{ border: `1px solid ${note.important ? 'red' : 'transparent'}`}}
        />
      )}
      </ul>
    </div>
  )
}

export default App


