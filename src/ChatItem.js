import React from 'react';
import { RiCheckDoubleFill, RiMapPin2Fill } from "react-icons/ri"; // Risco Duplo, Pin de localização
import { BsClockHistory } from "react-icons/bs"; // Relógio de mensagem temporária
import { CgMenuLeft } from "react-icons/cg"; // Votação
import { MdBlockFlipped } from "react-icons/md"; // Mensagem apagada
import { TiPin } from "react-icons/ti"; // Pin de fixado
import { FaUsers } from "react-icons/fa6"; // Ícone de grupo
import './styles/ChatItem.css';

function ChatItem({ avatarUrl, contactName, message, timestamp, isMyMessage, status }) { // Removido showAtIcon e unreadNotification
  const renderGeneralStatusIcon = () => {
    switch (status) {
      case 'read':
        return <RiCheckDoubleFill className="message-status general read" />;
      case 'unread': // Mantido o case 'unread'
        return <RiCheckDoubleFill className="message-status general unread" />;
      case 'pending': // Ícone de votação para pendente (baseado na imagem do chat "Leonardo")
        return <CgMenuLeft className="message-status general pending" />;
      case 'blocked': // Ícone de mensagem apagada
        return <MdBlockFlipped className="message-status general blocked" />;
      case 'location': // Ícone de localização
        return <RiMapPin2Fill className="message-status general location" />;
      case 'typing': // Sem ícone para digitando
        return null;
      case 'group': // Sem ícone de status no canto para grupo
        return null;
      default:
        return null;
    }
  };

  const renderAvatar = () => {
    if (status === 'group') {
      return <FaUsers className="avatar-img group-avatar" />; // Ícone de grupo para avatar
    }
    // Adiciona borda laranja para o primeiro item (Vida ❤️)
    const avatarClass = contactName === 'Vida ❤️' ? 'avatar-img orange-border' : 'avatar-img';
    return (
      <div className="avatar-container"> {/* Contêiner para posicionar o ícone de relógio */}
        <img src={avatarUrl || 'placeholder-avatar.png'} alt="Avatar" className={avatarClass} />
        {status === 'temporary' && ( // Renderiza ícone de relógio para status 'temporary'
          <BsClockHistory className="temporary-message-icon" />
        )}
      </div>
    );
  };

  const renderMessage = () => {
    if (status === 'typing') {
      return <p className="typing-message">{message}</p>;
    }
    return <p>{message}</p>;
  };

  const renderPinnedIcon = () => {
    if (status === 'pinned') {
      return <TiPin className="message-status pinned" />; // Ícone de pin para fixado
    }
    return null;
  };

  return (
    <div className={`chat-item ${isMyMessage ? 'my-message' : 'other-message'}`}>
      {renderAvatar()} {/* Renderiza o avatar com o contêiner */}
      <div className="chat-content">
        <div className="contact-name">{contactName || 'Nome do Contato'}</div>
        <div className="message-and-details">
          {renderGeneralStatusIcon()} {/* Ícone de status geral antes da mensagem */}
          <div className="message-content">
            {renderMessage()}
          </div>
          <div className="message-details">
            <span className="timestamp">{timestamp}</span>
            {renderPinnedIcon()} {/* Ícone de fixado ao lado do timestamp */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
