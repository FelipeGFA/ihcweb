import React from 'react';
import './styles/SearchBar.css';
import { FaSearch } from 'react-icons/fa'; // Importa o ícone de pesquisa

function SearchBar() {
  return (
    <div className="search-bar-container">
      <FaSearch className="search-icon" /> {/* Usa o componente do ícone */}
      <input type="text" placeholder="Pergunte à Meta AI ou pesquise" className="search-input" />
    </div>
  );
}

export default SearchBar;
