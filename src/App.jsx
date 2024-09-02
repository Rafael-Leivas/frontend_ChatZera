import axios from 'axios'
import { useState, useEffect } from 'react'
import Chat from './components/Chat/Chat'

function App() {
  const [body, setBody] = useState('')
  const [message, setMessage] = useState('')
  const [senderName, setSenderName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    axios.post('http://localhost:8000/chat', {
      message: message,
      sender_name: senderName  // Inclua o sender_name na requisição
    })
      .then(response => {
        const data = response.data
        console.log(data)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === "message") {
      setMessage(value)
    } else if (name === "sender_name") {
      setSenderName(value)
    }
  }

  return (
    <>
      <div>
        <Chat />
      </div>
    </>
  )
}

export default App
