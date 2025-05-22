import React from 'react';
import './styles/MeuPage.css';
import { FaRegStickyNote } from 'react-icons/fa';

function MeuPage() {
  return (
    <div className="meu-page">
      <div className="note-item">
        <div className="note-icon">
          <FaRegStickyNote />
        </div>
        <div className="note-content">
          <div className="note-title">Anotações...</div>
          <div className="note-subtitle">Aula às 10hrs</div>
        </div>
        <div className="note-time">08:01</div>
      </div>
    </div>
  );
}

export default MeuPage;
