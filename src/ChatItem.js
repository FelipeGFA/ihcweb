import React from 'react';
import { RiCheckDoubleFill, RiMapPin2Fill } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";
import { CgMenuLeft } from "react-icons/cg";
import { MdBlockFlipped } from "react-icons/md";
import { TiPin } from "react-icons/ti";
import { FaUsers } from "react-icons/fa6";
import './styles/ChatItem.css';

function ItemConv({ urlAvatar, nomeContato, msg, hora, minhaMsg, status, contNaoLidas, hasStatus }) {
  const renderIconeStatusGeral = () => {
    switch (status) {
      case 'read':
        return <RiCheckDoubleFill className="status-msg geral lida" />;
      case 'pending':
        return <CgMenuLeft className="status-msg geral pendente" />;
      case 'blocked':
        return <MdBlockFlipped className="status-msg geral bloqueada" />;
      case 'location':
        return <RiMapPin2Fill className="status-msg geral local" />;
      case 'typing':
        return null;
      case 'group':
        return null;
      default:
        return null;
    }
  };

  const renderAvatar = () => {
    if (status === 'group') {
      if (urlAvatar) {
        return (
          <div className="cont-avatar">
            <img src={urlAvatar} alt="Avatar Grupo" className="img-avatar avatar-grupo" />
          </div>
        );
      } else {
        return <FaUsers className="img-avatar avatar-grupo" />;
      }
    }
    const classeAvatar = hasStatus ? 'img-avatar borda-laranja' : 'img-avatar';
    return (
      <div className="cont-avatar">
        <img src={urlAvatar || 'placeholder-avatar.png'} alt="Avatar" className={classeAvatar} />
        {status === 'temporary' && (
          <BsClockHistory className="icone-msg-temp" />
        )}
      </div>
    );
  };

  const renderMsg = () => {
    if (status === 'typing') {
      return <p className="msg-digitando">{msg}</p>;
    }
    if (nomeContato === 'Nao é o leo') {
      return <p style={{ color: '#888' }}><em>{msg}</em></p>;
    }
    return <p>{msg}</p>;
  };

  const renderIconeFixado = () => {
    if (status === 'pinned') {
      return <TiPin className="status-msg fixado" />;
    }
    return null;
  };

  return (
    <div className={`item-conv ${minhaMsg ? 'minha-msg' : 'outra-msg'}`}>
      {renderAvatar()}
      <div className="conteudo-conv">
        <div className="nome-contato">{nomeContato || 'Nome do Contato'}</div>
        <div className="msg-e-detalhes">
          {renderIconeStatusGeral()}
          <div className="conteudo-msg">
            {renderMsg()}
          </div>
          <div className="detalhes-msg">
            <span className="hora">{hora}</span>
            {renderIconeFixado()}
            {contNaoLidas > 0 && (
              <div className="cont-notif-nao-lidas">
                <div className="notif-nao-lidas">
                  <span className="icone-arroba">@</span>
                  <span className="cont-nao-lidas">{contNaoLidas}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemConv;
