import React, { useState } from 'react';
import st from './UsernamePopup.module.css';

const UsernamePopup = ({ onUsernameSet }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username.trim() !== '') {
            localStorage.setItem('username', username);
            onUsernameSet(username);
        }
    };

    return (
        <div className={st.popup}>
            <div className={st.popupContent}>
                <h2>Digite seu nome de usuário</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nome de usuário"
                        className={st.input}
                    />
                    <button type="submit" className={st.button}>Confirmar</button>
                </form>
            </div>
        </div>
    );
};

export default UsernamePopup;
