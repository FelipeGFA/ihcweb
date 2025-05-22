import React from 'react';
import './styles/FooterNav.css';
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdChatbubbles } from "react-icons/io";
import { IoIosPeople } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkUnreadChatAlt } from "react-icons/md";

function NavRodape({ itemNavAtivo, aoMudarNav }) {
  return (
    <div className="cont-nav-rodape">
      <div
        className={`item-nav ${itemNavAtivo === 'Status' ? 'ativo' : ''}`}
        onClick={() => aoMudarNav('Status')}
      >
        <span className="icone-nav icone-status-pers">
          <span className="circulo-status"></span>
          <span className="arco-status arco-status-esq"></span>
          <span className="arco-status arco-status-dir"></span>
        </span>
        <span className="texto-nav">Status</span>
      </div>
      <div
        className={`item-nav ${itemNavAtivo === 'Telefone' ? 'ativo' : ''}`}
        onClick={() => aoMudarNav('Telefone')}
      >
        <FaPhoneAlt className="icone-nav" />
        <span className="texto-nav">Telefone</span>
      </div>
      <div
        className={`item-nav ${itemNavAtivo === 'Meu' ? 'ativo' : ''}`}
        onClick={() => aoMudarNav('Meu')}
      >
        <MdMarkUnreadChatAlt className="icone-nav" />
        <span className="texto-nav">Meu</span>
      </div>
      <div
        className={`item-nav ${itemNavAtivo === 'Comunidades' ? 'ativo' : ''}`}
        onClick={() => aoMudarNav('Comunidades')}
      >
        <IoIosPeople className="icone-nav" />
        <span className="texto-nav">Comunidades</span>
      </div>
      <div
        className={`item-nav ${itemNavAtivo === 'Conversas' ? 'ativo' : ''}`}
        onClick={() => aoMudarNav('Conversas')}
      >
        <span className="icone-nav"><IoMdChatbubbles /><span className="indicador-nao-lido">1</span></span>
        <span className="texto-nav">Conversas</span>
      </div>
      <div
        className={`item-nav ${itemNavAtivo === 'Configurações' ? 'ativo' : ''}`}
        onClick={() => aoMudarNav('Configurações')}
      >
        <IoSettingsOutline className="icone-nav" />
        <span className="texto-nav">Configurações</span>
      </div>
    </div>
  );
}

export default NavRodape;
