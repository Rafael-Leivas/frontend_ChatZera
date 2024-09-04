import axios from 'axios';
import { useState, useEffect } from 'react';
import Chat from '../../components/Chat/Chat';
import st from '../Home/Home.module.css';
import { FaGithub } from "react-icons/fa6";
import UsernamePopup from '../../components/UsernamePopup/UsernamePopup';

function Home() {
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setSenderName(storedUsername);
    }
  }, []);

  const handleUsernameSet = (username) => {
    setSenderName(username);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/chat', {
      message: message,
      sender_name: senderName  // Inclua o sender_name na requisição
    })
      .then(response => {
        const data = response.data;
        console.log(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "message") {
      setMessage(value);
    } else if (name === "sender_name") {
      setSenderName(value);
    }
  };

  return (
    <>
      <header>
        <h1 className={st.logo}>ChatZera</h1>
        <a className={st.link_github} href="https://github.com/Rafael-Leivas"><FaGithub /> GitHub</a>
      </header>
      {senderName === null ? (
        <UsernamePopup onUsernameSet={handleUsernameSet} />
      ) : (
        <div>
          <Chat user={senderName} />
        </div>
      )}
      <footer>
        <p>Copyright © Rafael Leivas. 2024 All rights reserved</p>
      </footer>
    </>
  );
}

export default Home;
