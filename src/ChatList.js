import React from 'react';
import ItemConv from './ChatItem';
import './styles/ChatList.css';
import { MdArchive } from "react-icons/md";

function ListaConv({ msgs, handleSelectStatus }) { // Adicionar handleSelectStatus
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
          hasStatus={chat.contactName === 'Vida ❤️' || chat.contactName === 'Nao é o leo'}
          handleSelectStatus={() => handleSelectStatus(chat)} // Passar o objeto chat completo
        />
      ))}
    </div>
  );
}

export default ListaConv;
