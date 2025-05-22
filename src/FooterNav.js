import React from 'react';
import './styles/FooterNav.css';
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdChatbubbles } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkUnreadChatAlt } from "react-icons/md";

function FooterNav({ activeNavItem, onNavChange }) {
  return (
    <div className="footer-nav-container">
      <div 
        className={`nav-item ${activeNavItem === 'Status' ? 'active' : ''}`}
        onClick={() => onNavChange('Status')}
      >
        <span className="nav-icon custom-status-icon">
          <span className="status-circle"></span>
          <span className="status-arc status-arc-left"></span>
          <span className="status-arc status-arc-right"></span>
        </span>
        <span className="nav-text">Status</span>
      </div>
      <div 
        className={`nav-item ${activeNavItem === 'Telefone' ? 'active' : ''}`}
        onClick={() => onNavChange('Telefone')}
      >
        <FaPhoneAlt className="nav-icon" />
        <span className="nav-text">Telefone</span>
      </div>
      <div 
        className={`nav-item ${activeNavItem === 'Meu' ? 'active' : ''}`}
        onClick={() => onNavChange('Meu')}
      >
        <MdMarkUnreadChatAlt className="nav-icon" />
        <span className="nav-text">Meu</span>
      </div>
      <div 
        className={`nav-item ${activeNavItem === 'Comunidades' ? 'active' : ''}`}
        onClick={() => onNavChange('Comunidades')}
      >
        <IoIosPeople className="nav-icon" />
        <span className="nav-text">Comunidades</span>
      </div>
      <div 
        className={`nav-item ${activeNavItem === 'Conversas' ? 'active' : ''}`}
        onClick={() => onNavChange('Conversas')}
      >
        <span className="nav-icon"><IoMdChatbubbles /><span className="unread-indicator">1</span></span>
        <span className="nav-text">Conversas</span>
      </div>
      <div 
        className={`nav-item ${activeNavItem === 'Configurações' ? 'active' : ''}`}
        onClick={() => onNavChange('Configurações')}
      >
        <IoSettingsOutline className="nav-icon" />
        <span className="nav-text">Configurações</span>
      </div>
    </div>
  );
}

export default FooterNav;
