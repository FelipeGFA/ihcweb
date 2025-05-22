import React from 'react';
import './styles/Header.css';
import { FaCamera } from "react-icons/fa";

function Header() {
  return (
    <div className="header-container">
      <div className="header-left">
        <span className="header-dots">...</span>
        <h1 className="header-title">Chats</h1>
      </div>
      <div className="header-right">
        <FaCamera className="header-icon" />
        <span className="header-icon header-plus-icon">+</span>
      </div>
    </div>
  );
}

export default Header;
