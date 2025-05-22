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
    return notasSalvas ? JSON.parse(notasSalvas) : [
      { text: 'Prova hoje às 19hrs no auditório.', time: '16:12' },
      { text: 'Tomar remédio meia noite.', time: '16:14' },
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
      setNotas([...notas, { text: msg, time }]);
      setMsg('');
    }
  };

  const lidarDeletarNota = (idxDeletar) => {
    setNotas(notas.filter((_, index) => index !== idxDeletar));
  };

  return (
    <div className="pag-notas-conv">
      <header className="cabecalho-notas-conv">
        <IoIosArrowBack className="icone-voltar" onClick={lidarVoltar} />
        <span className="titulo-cabecalho">Anotações</span>
      </header>
      <div className="msgs-notas-conv">
        {notas.map((note, index) => (
          <div key={index} className="msg-nota">
            <div className="bolha-msg">
              {note.text}
              <span className="hora-msg">{note.time}</span>
            </div>
            <MdDelete className="icone-deletar" onClick={() => lidarDeletarNota(index)} />
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
