import React from 'react';
import ItemConv from './ChatItem';
import './styles/ChatList.css';
import { MdArchive } from "react-icons/md";

function ListaConv({ msgs, handleSelectStatus }) {
  return (
    <div className="lista-conv">
      <div className="secao-arquivados">
        <MdArchive className="icone-arquivo" />
        <span>Arquivados</span>
      </div>
      {msgs.map((chat) => (
        <ItemConv
          key={chat.id}
          urlAvatar={chat.avatarUrl}
          nomeContato={chat.contactName}
          msg={chat.text}
          hora={chat.timestamp}
          minhaMsg={chat.isMyMessage}
          status={chat.status}
          contNaoLidas={chat.unreadCount}
          hasStatus={chat.contactName === 'Vida ❤️' || chat.contactName === 'Nao é o leo'}
          handleSelectStatus={() => handleSelectStatus(chat)}
        />
      ))}
    </div>
  );
}

export default ListaConv;
