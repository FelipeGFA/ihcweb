import React from 'react';
import ChatItem from './ChatItem';
import './styles/ChatList.css';
import { MdArchive } from "react-icons/md"; // Ícone para arquivados

function ChatList({ messages }) { // Aceita messages como prop
  return (
    <div className="chat-list">
      <div className="archived-section">
        <MdArchive className="archive-icon" />
        <span>Arquivados</span>
      </div>
      {messages.map((chat, index) => ( // Usa a prop messages
        <ChatItem
          key={index}
          avatarUrl={chat.avatarUrl}
          contactName={chat.contactName}
          message={chat.text}
          timestamp={chat.timestamp}
          isMyMessage={chat.isMyMessage}
          status={chat.status}
          unreadCount={chat.unreadCount}
        />
      ))}
    </div>
  );
}

export default ChatList;
