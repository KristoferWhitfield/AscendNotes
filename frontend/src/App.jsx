import { useState, useEffect } from 'react'
import Notes from './components/notes'
import Form from './components/Form'
import { noteServices } from './services/noteServices'
import SuccessMessage from './components/SuccessMessage'
import ErrorMessage from './components/ErrorMessage'

const {
  get,
  create,
  update,
  remove
} = noteServices

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [disableFunction, setDisableFunction] = useState(false)

  const collection = notes.sort((a, b) =>  b.important - a.important)

  useEffect(() => {
    get()
    .then(notes => 
      setNotes(notes)
    )
  }, [])

  const changeId = () => {
    const noteId = String(!notes.length ? 1 : notes.length + 1)
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
    //Post rq
    create(noteObject)
    .then(newNotes => 
      setNotes(notes.concat(newNotes))
    )
    
    setNewNote('')
  }

  const findNote = (id) => {
    return notes.find(note => note.id === id)
  }

  const toggleImportant = (id) => {
    const note = findNote(id)
    const updatedImportance = {...note, important: !note.important}
    //Post rq
    update(id, updatedImportance)
    .then(
      setNotes(notes.map(n => n.id !== id ? n : updatedImportance))

    )
  }

  const updateNote = (id) => {
    const note = findNote(id)
    const notePrompt = window.prompt('Do you want to update this note?', note.text)

    if(notePrompt){
      const updatedText = {...note, text: notePrompt}
      //Post rq
      update(id, updatedText)
      .then(
        setNotes(notes.map(n => n.id === id ? updatedText : n)),
        setSuccessMessage('Successfully Updated.'),
        setDisableFunction(true),
        setTimeout(() => {
          setSuccessMessage(null),
          setDisableFunction(false)
        }, 1500)
      )
      .catch(error => {
          console.log(error)
          setErrorMessage('This note does not currently exist on the server!'),
          setDisableFunction(true),
          setTimeout(() => {
            setErrorMessage(null)
            setDisableFunction(false)
          }, 1500)
      })
    }
  }
  // Delete
  const deleteNote = (id) => {
    const filteredNote = notes.filter(note => id !== note.id)
    const confirmDelete = window.confirm('Would you want to remove this note?')

    if(confirmDelete){
      remove(id)
      .then(
        setNotes(filteredNote),
        setSuccessMessage('Successfully Deleted Note.'),
        setDisableFunction(true),
        setTimeout(() => {
          setSuccessMessage(null),
          setDisableFunction(false)
        }, 1500)
      )
      .catch(error => {
        console.log(error)
        setErrorMessage('This Note has already been removed!'),
        setTimeout(() => {
          setErrorMessage(null)
        }, 1500)
      })
    }
  }

  return (
    <div>
      <h1>Ascend Notes</h1>
      <Form 
        onSubmit={addNewNote} 
        value={newNote} 
        onChange={(e) => setNewNote(e.target.value)}
      />
      <hr />
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage}/>
      <div style={{marginTop: '20px'}}>
        {collection.map(note => 
          <Notes 
            key={note.id} 
            note={note}
            deactivate={disableFunction}
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


