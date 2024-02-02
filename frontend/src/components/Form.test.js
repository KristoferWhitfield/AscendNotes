import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'
import userEvent from '@testing-library/user-event'


test('<App /> updates parent state and calls onSubmit', async () => {
  const noteObject = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<App noteObject={noteObject} />)


  const input = container.querySelector('#note-input')
  const sendButton = screen.getByText('Add')
  
  await user.type(input, 'testing a form...')
  await user.click(sendButton)
  
  expect(noteObject).toHaveBeenCalled()
  expect(noteObject.mock.calls).toHaveLength(1)
  console.log(noteObject.mock.calls[0][0].target)
  expect(noteObject.mock.calls[0][0].content).toBe('testing a form...')
})