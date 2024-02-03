function Form({ onChange, value, onSubmit }) {
  return (
    <div data-testid="form-element">
      <form onSubmit={onSubmit}>
        <input 
          value={value}
          required
          placeholder="write a note"
          onChange={onChange}
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Form
