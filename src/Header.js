import React from 'react';
import './styles/Header.css';
import { FaCamera } from "react-icons/fa";

function Cabecalho() {
  return (
    <div className="cont-cabecalho">
      <div className="cabecalho-esq">
        <span className="pontos-cabecalho">...</span>
        <h1 className="titulo-cabecalho">Chats</h1>
      </div>
      <div className="cabecalho-dir">
        <FaCamera className="icone-cabecalho" />
        <span className="icone-cabecalho icone-mais-cabecalho">+</span>
      </div>
    </div>
  );
}

export default Cabecalho;
