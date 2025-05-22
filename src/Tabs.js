import React from 'react';
import './styles/Tabs.css';

function Abas({ abaAtiva, aoMudarAba }) {
  return (
    <div className="cont-abas">
      <button
        className={`aba ${abaAtiva === 'Todos' ? 'ativo' : ''}`}
        onClick={() => aoMudarAba('Todos')}
      >
        Todos
      </button>
      <button
        className={`aba ${abaAtiva === 'Não lido' ? 'ativo' : ''}`}
        onClick={() => aoMudarAba('Não lido')}
      >
        Não lido
      </button>
      <button
        className={`aba ${abaAtiva === 'Meu' ? 'ativo' : ''}`}
        onClick={() => aoMudarAba('Meu')}
      >
        Meu
      </button>
      <button
        className={`aba ${abaAtiva === 'Grupos' ? 'ativo' : ''}`}
        onClick={() => aoMudarAba('Grupos')}
      >
        Grupos
      </button>
      <button className="aba-add">+</button>
    </div>
  );
}

export default Abas;
