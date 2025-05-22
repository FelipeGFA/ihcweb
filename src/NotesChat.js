import React, { useState, useEffect } from 'react'; // Importar useEffect
import { useNavigate } from 'react-router-dom';
import './styles/NotesChat.css';
import { IoIosArrowBack } from 'react-icons/io';
import { FaPaperPlane } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineContentCopy } from 'react-icons/md';
import { MdDelete } from 'react-icons/md'; // Importar ícone de lixeira

function NotesChat() {
  const navigate = useNavigate(); // Hook para navegação

  // Carregar notas do localStorage ao iniciar
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notesChat');
    return savedNotes ? JSON.parse(savedNotes) : [
      { text: 'Prova hoje às 19hrs no auditório.', time: '16:12' },
      { text: 'Tomar remédio meia noite.', time: '16:14' },
    ];
  });
  const [message, setMessage] = useState('');

  // Salvar notas no localStorage sempre que forem atualizadas
  useEffect(() => {
    localStorage.setItem('notesChat', JSON.stringify(notes));
  }, [notes]);

  const handleBackClick = () => {
    navigate(-1); // Voltar para a página anterior
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      setNotes([...notes, { text: message, time }]);
      setMessage('');
    }
  };

  const handleDeleteNote = (indexToDelete) => {
    setNotes(notes.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="notes-chat-page">
      <header className="notes-chat-header">
        <IoIosArrowBack className="back-icon" onClick={handleBackClick} /> {/* Adicionar onClick */}
        <span className="header-title">Anotações</span>
      </header>
      <div className="notes-chat-messages">
        {notes.map((note, index) => (
          <div key={index} className="note-message">
            <div className="message-bubble">
              {note.text}
              <span className="message-time">{note.time}</span>
            </div>
            <MdDelete className="delete-icon" onClick={() => handleDeleteNote(index)} /> {/* Adicionar ícone de lixeira */}
          </div>
        ))}
      </div>
      <div className="notes-chat-input-area">
        <IoMdAdd className="add-icon" />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <MdOutlineContentCopy className="copy-icon" />
        <FaPaperPlane className="send-icon" onClick={handleSendMessage} />
      </div>
    </div>
  );
}

export default NotesChat;
