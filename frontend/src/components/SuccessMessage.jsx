import { FaCheckCircle } from "react-icons/fa";

function SuccessMessage({ message }) {
  const style = {
    display: 'flex',
    backgroundColor: '#d4edda',
    border: '3px solid #a0d8ad',
    color: '#155724',
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
          <FaCheckCircle data-testid="success-icon" style={{marginRight: '10px'}}/>
          {message}
        </div>) : null
      }
    </>
  )
}

export default SuccessMessage