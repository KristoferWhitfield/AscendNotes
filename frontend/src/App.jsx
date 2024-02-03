import { useState, useEffect } from 'react'
import Notes from './components/Notes'
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

function App( {noteObject }) {
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

  const addNewNote = (e) => {
    e.preventDefault()
    //Set up new note object
    noteObject = ({
      content: newNote,
      important: false
    })
    //Post rq
    if(newNote.length >= 5){
      create(noteObject)
      .then(newNotes => 
        setNotes(notes.concat(newNotes))
      ).catch(error => 
        console.log(error.response.data.error)
      )
    }else {
      setErrorMessage('Not enough characters for a note! : Minimum length - 5')

      setTimeout(() => {
        setErrorMessage(null)
      }, 1000)
    }
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
  const notePrompt = window.prompt('Do you want to update this note?', note.content)

  if(notePrompt){
    if(notePrompt.length >= 5){
      const updatedContent = {...note, content: notePrompt}
      //Post rq
      update(id, updatedContent)
      .then(
        setNotes(notes.map(n => n.id === id ? updatedContent : n)),
        setSuccessMessage('Successfully Updated.'),
        setDisableFunction(true),
        setTimeout(() => {
          setSuccessMessage(null),
          setDisableFunction(false)
        }, 1000)
      )
      .catch(error => {
          console.log(error)
          setErrorMessage('This note does not currently exist on the server!'),
          setDisableFunction(true),
          setTimeout(() => {
            setErrorMessage(null)
            setDisableFunction(false)
          }, 1000)
      })
      } else {
        setErrorMessage('Not enough characters for a note! : Minimum length - 5')

        setTimeout(() => {
          setErrorMessage(null)
        }, 1000)
      }
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
        }, 1000)
      )
      .catch(error => {
        console.log(error)
        setErrorMessage('This Note has already been removed!'),
        setTimeout(() => {
          setErrorMessage(null)
        }, 1000)
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
            important={note.important}
            updateNote={() => updateNote(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        )}
      </div>
    </div>
  )
}

export default App


