import React from 'react';
import ItemConv from './ChatItem';
import './styles/ChatList.css';
import { MdArchive } from "react-icons/md";

function ListaConv({ msgs }) {
  return (
    <div className="lista-conv">
      <div className="secao-arquivados">
        <MdArchive className="icone-arquivo" />
        <span>Arquivados</span>
      </div>
      {msgs.map((chat, index) => (
        <ItemConv
          key={index}
          urlAvatar={chat.avatarUrl}
          nomeContato={chat.contactName}
          msg={chat.text}
          hora={chat.timestamp}
          minhaMsg={chat.isMyMessage}
          status={chat.status}
          contNaoLidas={chat.unreadCount}
        />
      ))}
    </div>
  );
}

export default ListaConv;
