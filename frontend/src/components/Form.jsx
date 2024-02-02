function Form({ onChange, value, onSubmit }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          value={value}
          required
          onChange={onChange}
          id='note-input'
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Form
