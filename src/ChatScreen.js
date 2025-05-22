import React, { useState } from 'react';
import './styles/ChatScreen.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faVideo, faPhone, faPaperclip, faCamera, faMicrophone, faSmile } from '@fortawesome/free-solid-svg-icons';

function ChatScreen() {
    const { name } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { avatarUrl, lastMessage } = location.state || {};
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const generateUniqueId = () => Date.now() + Math.random();

    const vidaMessages = [
        { id: generateUniqueId(), text: 'sinceramente, eu acho que estou grávida', time: '16:13', sender: 'other' },
        { id: generateUniqueId(), text: 'e', time: '16:13', sender: 'other' },
        { id: generateUniqueId(), text: 'só isso mesmo', time: '16:13', sender: 'other' },
        { id: generateUniqueId(), text: 'ai é foda', time: '16:13', sender: 'me' },
        { id: generateUniqueId(), text: 'vou comprar cigarro', time: '16:14', sender: 'me' },
        { id: generateUniqueId(), text: 'kkkkk brinca mt', time: '16:14', sender: 'other' },
    ];

    const leoxxMessages = [
        { id: generateUniqueId(), text: 'parece tu', time: '16:15', sender: 'other', isImage: true, imageUrl: 'https://pbs.twimg.com/media/Fn9cLqjWQAA8IoA?format=jpg&name=small' },
        { id: generateUniqueId(), text: 'faltar a aula hoje', time: '16:15', sender: 'other', isPoll: true, pollOptions: [{ text: 'Sim', votes: 1, myVote: true }, { text: 'Sim', votes: 0, myVote: false }, { text: 'Não sei', votes: 0, myVote: false }] },
    ];

    React.useEffect(() => {
        let initialMessages = [];
        if (name === 'Vida ❤️') {
            initialMessages = vidaMessages;
        } else if (name === 'Leoxx') {
            initialMessages = leoxxMessages;
        }

        if (lastMessage && name !== 'Vida ❤️' && name !== 'Leoxx') {
            initialMessages = [{ id: generateUniqueId(), text: lastMessage, time: 'Agora', sender: 'other' }, ...initialMessages];
        }
        setMessages(initialMessages);
    }, [name, lastMessage]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            const now = new Date();
            const time = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
            setMessages(prevMessages => [...prevMessages, { id: generateUniqueId(), text: message, time: time, sender: 'me' }]);
            setMessage('');
        }
    };

    return (
        <div className="chat-screen">
            <header className="chat-header">
                <div className="chat-header-left">
                    <FontAwesomeIcon icon={faArrowLeft} onClick={handleBackClick} className="back-icon" />
                    <img src={avatarUrl || 'https://via.placeholder.com/40'} alt="Profile" className="chat-profile-pic" />
                    <span className="chat-name">{name}</span>
                </div>
                <div className="chat-header-right">
                    <FontAwesomeIcon icon={faVideo} className="header-icon" />
                    <FontAwesomeIcon icon={faPhone} className="header-icon" />
                </div>
            </header>
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                        {msg.isImage ? (
                            <div className="message-image-container">
                                <img src={msg.imageUrl} alt="Enviado" className="message-image" />
                                <span className="message-image-text">{msg.text}</span>
                            </div>
                        ) : msg.isPoll ? (
                            <div className="message-poll">
                                <span className="poll-question">{msg.text}</span>
                                <span className="poll-select-one">Selecione um</span>
                                {msg.pollOptions.map((option, optIndex) => (
                                    <div key={optIndex} className="poll-option">
                                        <input type="radio" id={`poll-option-${msg.id}-${optIndex}`} name={`poll-${msg.id}`} checked={option.myVote} readOnly />
                                        <label htmlFor={`poll-option-${msg.id}-${optIndex}`}>{option.text}</label>
                                        <div className="poll-bar-container">
                                            <div className="poll-bar" style={{ width: `${option.votes * 100}%`, backgroundColor: option.myVote ? '#25d366' : '#f0f0f0' }}></div>
                                            <span className="poll-votes">{option.votes}</span>
                                        </div>
                                    </div>
                                ))}
                                <span className="poll-view-votes">Ver votos</span>
                            </div>
                        ) : (
                            <span className="message-text">{msg.text}</span>
                        )}
                        <span className="message-time">{msg.time}</span>
                        {msg.sender === 'me' && <span className="message-status">✓✓</span>}
                    </div>
                ))}
            </div>
            <div className="chat-input-area">
                <FontAwesomeIcon icon={faSmile} className="input-icon" />
                <input
                    type="text"
                    className="message-input"
                    placeholder="Mensagem"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                />
                <FontAwesomeIcon icon={faPaperclip} className="input-icon" />
                <FontAwesomeIcon icon={faCamera} className="input-icon" />
                <FontAwesomeIcon icon={faMicrophone} className="input-icon" />
            </div>
        </div>
    );
}

export default ChatScreen;
