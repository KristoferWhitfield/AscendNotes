import { useState } from 'react'
import Notes from './components/Notes'
import Form from './components/Form'

function App() {
  // const style = {
  //   fontSize: '20px',
  //   // fontWeight: '900'
  // }
  const testNote = [
    {
      id: 1,
      text: "Html, Css, and Javascript are fun!!",
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
  // const [successMessage, setSuccessMessage] = useState(null)
  // const [errorMessage, setErrorMessage] = useState(null)

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

  const findId = (id) => {
    return notes.find(note => note.id === id)
  }

  const toggleImportant = (id) => {
    const note = findId(id)
    const changedNote = {...note, important: !note.important}

    setNotes(notes.map(n => n.id !== id ? n : changedNote))
  }

  const updateNote = (id) => {
    const note = findId(id)
    const updateNote = window.prompt('Do you want to update this note?', note.text)

    if(updateNote){
      const changedText = {...note, text: updateNote}
      setNotes(notes.map((n) => n.id === id ? changedText : n))
    }
  }

  // Delete
  const deleteNote = (id) => {
    const filteredNote = notes.filter(note => id !== note.id)
    const confirmDelete = window.confirm('Would you want to remove this note?')

    if(confirmDelete){
      setNotes(filteredNote)
    }
  }

  
  return (
    <div>
      <h1>Ascend Notes</h1>
      <Form 
        onSubmit={addNewNote} 
        value={newNote} 
        onChange={(e) => setNewNote(e.target.id)}
      />
      <hr />
      <div>
        {notes.map(note => 
          <Notes 
            key={note.id} 
            note={note}
            toggleImportant={() => toggleImportant(note.id)} 
            updateNote={() => updateNote(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        )}
      </div>
    </div>
  )
}

export default App


