import React from 'react';
import './styles/SearchBar.css';
import { FaSearch } from 'react-icons/fa';

function BarraPesq() {
  return (
    <div className="cont-barra-pesq">
      <FaSearch className="icone-pesq" />
      <input type="text" placeholder="Pergunte à Meta AI ou pesquise" className="input-pesq" />
    </div>
  );
}

export default BarraPesq;
