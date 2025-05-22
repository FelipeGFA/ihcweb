import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/MeuPage.css';
import { FaRegStickyNote } from 'react-icons/fa';

function PagMeu({ abaAtiva }) {
  const navegar = useNavigate();
  const [ultNota, setUltNota] = useState({ text: 'Nenhuma anotação', time: '' });

  const obterUltNota = () => {
    const notasSalvas = localStorage.getItem('notesChat');
    if (notasSalvas) {
      const notas = JSON.parse(notasSalvas);
      if (notas.length > 0) {
        return { text: notas[notas.length - 1].text, time: notas[notas.length - 1].time };
      }
    }
    return { text: 'Tomar remédio meia noite.', time: '16:14' };
  };

  useEffect(() => {
    if (abaAtiva === 'Meu') {
      setUltNota(obterUltNota());
    }
  }, [abaAtiva]);

  const lidarCliqNotas = () => {
    navegar('/notes');
  };

  return (
    <div className="pag-meu">
      <div className="item-nota" onClick={lidarCliqNotas}>
        <div className="icone-nota">
          <FaRegStickyNote />
        </div>
        <div className="conteudo-nota">
          <div className="titulo-nota">Anotações...</div>
          <div className="subtitulo-nota">{ultNota.text}</div>
        </div>
        <div className="hora-nota">{ultNota.time}</div>
      </div>
    </div>
  );
}

export default PagMeu;
