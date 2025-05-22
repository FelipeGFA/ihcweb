import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/NotesChat.css';
import { IoIosArrowBack } from 'react-icons/io';
import { FaPaperPlane } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineContentCopy } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

function NotasConv() {
  const navegar = useNavigate();

  const [notas, setNotas] = useState(() => {
    const notasSalvas = localStorage.getItem('notesChat');
    if (notasSalvas) {
      return JSON.parse(notasSalvas);
    }
    // Adiciona IDs únicos às notas padrão se não houver notas salvas
    return [
      { id: Date.now() + 1, text: 'Prova hoje às 19hrs no auditório.', time: '16:12' },
      { id: Date.now() + 2, text: 'Tomar remédio meia noite.', time: '16:14' },
    ];
  });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    localStorage.setItem('notesChat', JSON.stringify(notas));
  }, [notas]);

  const lidarVoltar = () => {
    navegar(-1);
  };

  const lidarEnviarMsg = () => {
    if (msg.trim()) {
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      const novaNota = { id: Date.now(), text: msg, time }; // Adiciona um ID único
      setNotas([...notas, novaNota]);
      setMsg('');
    }
  };

  const lidarDeletarNota = (idDeletar) => {
    setNotas(notas.filter(note => note.id !== idDeletar));
  };

  return (
    <div className="pag-notas-conv">
      <header className="cabecalho-notas-conv">
        <IoIosArrowBack className="icone-voltar" onClick={lidarVoltar} />
        <span className="titulo-cabecalho">Anotações</span>
      </header>
      <div className="msgs-notas-conv">
        {notas.map((note) => (
          <div key={note.id} className="msg-nota">
            <div className="bolha-msg">
              {note.text}
              <span className="hora-msg">{note.time}</span>
            </div>
            <MdDelete className="icone-deletar" onClick={() => lidarDeletarNota(note.id)} />
          </div>
        ))}
      </div>
      <div className="area-input-notas-conv">
        <IoMdAdd className="icone-add" />
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              lidarEnviarMsg();
            }
          }}
        />
        <MdOutlineContentCopy className="icone-copiar" />
        <FaPaperPlane className="icone-enviar" onClick={lidarEnviarMsg} />
      </div>
    </div>
  );
}

export default NotasConv;
