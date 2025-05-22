import React from 'react';
import { RiCheckDoubleFill, RiMapPin2Fill } from "react-icons/ri"; // Risco Duplo, Pin de localização
import { BsClockHistory } from "react-icons/bs"; // Relógio de mensagem temporária
import { CgMenuLeft } from "react-icons/cg"; // Votação
import { MdBlockFlipped } from "react-icons/md"; // Mensagem apagada
import { TiPin } from "react-icons/ti"; // Pin de fixado
import { FaUsers } from "react-icons/fa6"; // Ícone de grupo
import './styles/ChatItem.css';

function ChatItem({ avatarUrl, contactName, message, timestamp, isMyMessage, status, unreadCount }) {
  const renderGeneralStatusIcon = () => {
    switch (status) {
      case 'read':
        return <RiCheckDoubleFill className="message-status general read" />;
      case 'pending':
        return <CgMenuLeft className="message-status general pending" />;
      case 'blocked':
        return <MdBlockFlipped className="message-status general blocked" />;
      case 'location':
        return <RiMapPin2Fill className="message-status general location" />;
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
      if (avatarUrl) {
        return (
          <div className="avatar-container">
            <img src={avatarUrl} alt="Group Avatar" className="avatar-img group-avatar" />
          </div>
        );
      } else {
        return <FaUsers className="avatar-img group-avatar" />;
      }
    }
    const avatarClass = contactName === 'Vida ❤️' ? 'avatar-img orange-border' : 'avatar-img';
    return (
      <div className="avatar-container">
        <img src={avatarUrl || 'placeholder-avatar.png'} alt="Avatar" className={avatarClass} />
        {status === 'temporary' && (
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
      return <TiPin className="message-status pinned" />;
    }
    return null;
  };

  return (
    <div className={`chat-item ${isMyMessage ? 'my-message' : 'other-message'}`}>
      {renderAvatar()}
      <div className="chat-content">
        <div className="contact-name">{contactName || 'Nome do Contato'}</div>
        <div className="message-and-details">
          {renderGeneralStatusIcon()}
          <div className="message-content">
            {renderMessage()}
          </div>
          <div className="message-details">
            <span className="timestamp">{timestamp}</span>
            {renderPinnedIcon()}
            {unreadCount > 0 && (
              <div className="unread-notification-container"> {/* Novo contêiner para a notificação */}
                <div className="unread-notification">
                  <span className="at-icon">@</span>
                  <span className="unread-count">{unreadCount}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
