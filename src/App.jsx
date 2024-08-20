import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
  const [body, setBody] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(response => {
        const data = response.data
        console.log(data)
        setBody(data['message'])
      })
      .catch((e) => {
        console.error(e)
        setBody('Error')
      })
  }, [])

  return (
    <>
      <div>
        {body}
      </div>
    </>
  )
}

export default App
