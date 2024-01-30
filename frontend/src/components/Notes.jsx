function Notes({ text, toggleImportant, style, updateNote }) {

  return (
    <>
      <p style={style}>{text}</p>
      <button onClick={toggleImportant}>Mark Important</button>
      <button onClick={updateNote}>Update</button>
    </>
  )
}

export default Notes