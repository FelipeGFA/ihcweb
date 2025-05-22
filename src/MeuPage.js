import React, { useState, useEffect } from 'react'; // Importar useState e useEffect
import { useNavigate } from 'react-router-dom';
import './styles/MeuPage.css';
import { FaRegStickyNote } from 'react-icons/fa';

function MeuPage({ activeTab }) { // Receber activeTab como prop
  const navigate = useNavigate();
  const [lastNote, setLastNote] = useState({ text: 'Nenhuma anotação', time: '' });

  // Função para obter a última nota do localStorage
  const getLatestNote = () => {
    const savedNotes = localStorage.getItem('notesChat');
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      if (notes.length > 0) {
        return { text: notes[notes.length - 1].text, time: notes[notes.length - 1].time };
      }
    }
    // Se não houver notas salvas, retornar as notas iniciais
    return { text: 'Tomar remédio meia noite.', time: '16:14' };
  };

  // Atualizar a última nota sempre que o componente for montado ou activeTab mudar para 'Meu'
  useEffect(() => {
    if (activeTab === 'Meu') {
      setLastNote(getLatestNote());
    }
  }, [activeTab]); // Depender de activeTab

  const handleNotesClick = () => {
    navigate('/notes');
  };

  return (
    <div className="meu-page">
      <div className="note-item" onClick={handleNotesClick}>
        <div className="note-icon">
          <FaRegStickyNote />
        </div>
        <div className="note-content">
          <div className="note-title">Anotações...</div>
          <div className="note-subtitle">{lastNote.text}</div> {/* Exibir última nota */}
        </div>
        <div className="note-time">{lastNote.time}</div> {/* Exibir hora da última nota */}
      </div>
    </div>
  );
}

export default MeuPage;
