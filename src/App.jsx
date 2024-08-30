import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
  const [body, setBody] = useState('')
  const [message, setMessage] = useState('')
  const [senderName, setSenderName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(response => {
        const data = response.data
        setBody(data['message'])
      })
      .catch((e) => {
        console.error(e)
        setBody('Error')
      })
  }, [])

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
      <form onSubmit={handleSubmit}>
        <label>
          Mensagem:
          <input
            type="text"
            name="message"
            value={message}
            onChange={handleChange}  // Atualiza o estado 'message' quando o usuário digita
          />
        </label>
        <label>
          Responsável:
          <input
            type="text"
            name="sender_name"
            value={senderName}
            onChange={handleChange}  // Atualiza o estado 'senderName' quando o usuário digita
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        {body}
      </div>
    </>
  )
}

export default App
