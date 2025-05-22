import React from 'react';
import { RiCheckDoubleFill, RiMapPin2Fill } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";
import { CgMenuLeft } from "react-icons/cg";
import { MdBlockFlipped } from "react-icons/md";
import { TiPin } from "react-icons/ti";
import './styles/ChatItem.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function ItemConv({ urlAvatar, nomeContato, msg, hora, minhaMsg, status, contNaoLidas, hasStatus, handleSelectStatus }) {
  const navigate = useNavigate(); // Inicializar useNavigate
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
    const defaultAvatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    const groupAvatar = 'https://image.winudf.com/v2/image/Y29tLmFwcC53aGF0c2FwcC5kcC5wcm9maWxlLnBpYy5kb3dubG9hZC5zYXZlcl9pY29uXzBfYTRmYmNhODM/icon.png?w=&fakeurl=1';

    const avatarSrc = status === 'group' ? groupAvatar : defaultAvatar;
    const classeAvatar = hasStatus ? 'img-avatar borda-laranja' : 'img-avatar';
    console.log(`ChatItem: ${nomeContato}, hasStatus: ${hasStatus}`); // Adicionar console.log
    return (
      <div className="cont-avatar">
        <img
          src={avatarSrc}
          alt="Avatar"
          className={classeAvatar}
          onClick={hasStatus ? () => handleSelectStatus({ name: nomeContato }) : null}
        />
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

  const handleChatClick = () => {
    navigate(`/chat/${nomeContato}`, { state: { avatarUrl: urlAvatar, lastMessage: msg } }); // Navega para a tela de chat com o nome do contato e passa a avatarUrl e a última mensagem
  };

  return (
    <div className={`item-conv ${minhaMsg ? 'minha-msg' : 'outra-msg'}`}>
      {renderAvatar()}
      <div className="conteudo-conv" onClick={handleChatClick}> {/* Mover o onClick para aqui */}
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
