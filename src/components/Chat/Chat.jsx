import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [senderName, setSenderName] = useState('User'); // Pode ser dinâmico
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
            sendJsonMessage({ message, sender_name: senderName });
            setMessage('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite uma mensagem"
            />
            <button onClick={handleSendMessage}>Enviar</button>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender_name}:</strong> {msg.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;
