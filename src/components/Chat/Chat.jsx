import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import st from './Chat.module.css';
import { RiGroup2Fill } from "react-icons/ri";

const Chat = ({ user }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const { sendJsonMessage, lastJsonMessage } = useWebSocket('ws://localhost:8000/ws/chat', {
        onOpen: () => console.log('WebSocket conectado'),
        onClose: () => console.log('WebSocket desconectado'),
        shouldReconnect: () => true,
    });

    useEffect(() => {
        if (lastJsonMessage !== null) {
            setMessages(prev => [...prev, lastJsonMessage]);
        }
    }, [lastJsonMessage]);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            sendJsonMessage({ message, sender_name: user });
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Impede a ação padrão do Enter (como a quebra de linha)
            handleSendMessage();
        }
    };

    return (
        <div className={st.chatContainer}>
            <div className={st.header}>
                <p><RiGroup2Fill className={st.photo_group} /> Chat global</p>
            </div>
            <div className={st.messageList}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`${st.messageItem} ${msg.sender_name === user ? st.userMessage : st.otherMessage}`}
                    >
                        {msg.sender_name !== user && <span className={st.senderName}>{msg.sender_name}:</span>}
                        {msg.message}
                    </div>
                ))}
            </div>
            <div className={st.messageInputContainer}>
                <input
                    type="text"
                    className={st.messageInput}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite uma mensagem"
                />
                <button className={st.sendButton} onClick={handleSendMessage}>
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default Chat;
