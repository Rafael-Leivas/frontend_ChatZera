import axios from 'axios';
import { useState, useEffect } from 'react';
import Chat from '../../components/Chat/Chat';
import st from '../Home/Home.module.css';
import { FaGithub } from "react-icons/fa6";
import UsernamePopup from '../../components/UsernamePopup/UsernamePopup';

function Home() {
  const [senderName, setSenderName] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setSenderName(storedUsername);
    }
  }, []);

  const handleUsernameSet = (username) => {
    setSenderName(username);
    sessionStorage.setItem('username', username);
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
