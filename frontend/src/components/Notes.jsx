function Notes({ text, toggleImportant, style }) {

  return (
    <>
      <p style={style}>{text}</p>
      <button onClick={toggleImportant}>Mark Important</button>
      
    </>
  )
}

export default Notes