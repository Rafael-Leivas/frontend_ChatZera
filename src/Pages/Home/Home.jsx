import axios from 'axios'
import { useState, useEffect } from 'react'
import Chat from '../../components/Chat/Chat'
import st from '../Home/Home.module.css'
import { FaGithub } from "react-icons/fa6";

function Home() {
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
      <header>
        <h1 className={st.logo}> ChatZera</h1>
        <a className={st.link_github} href="#"><FaGithub />  GitHub</a>
      </header>
      <div>
        {/* <Chat /> */}
      </div>
    </>
  )
}

export default Home
