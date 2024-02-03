import { MdError } from "react-icons/md";

function ErrorMessage({ message }) {
  const style = {
    display: 'flex',
    backgroundColor: '#ff000055',
    border: '3px solid #cf5c5c',
    color: '#f81e1e',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '20px',
    width: '300px',
    height: 'auto'
  }

  return (
    <>
      {message ? 
        (<div style={style}>
          <MdError data-testid="error-icon" style={{marginRight: '5px'}}/>
          Error: {message}
        </div>) : null
      }
    </>
  )
}

export default ErrorMessage