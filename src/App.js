import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Cabecalho from './Header';
import BarraPesq from './SearchBar';
import Abas from './Tabs';
import ListaConv from './ChatList';
import PagMeu from './MeuPage';
import NotasConv from './NotesChat';
import NavRodape from './FooterNav';

function ConteudoApp() {
  const [abaAtiva, setAbaAtiva] = useState('Todos');
  const [itemNavAtivo, setItemNavAtivo] = useState('Conversas');
  const [conv, setConv] = useState([]);
  const [convFiltradas, setConvFiltradas] = useState([]);

  useEffect(() => {
    const todasConv = [
      { id: 1, name: 'Vida ❤️', lastMessage: 'Você reagiu com a mensagem "te amo"', time: '16:14', status: 'pinned', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
      { id: 2, name: 'Leonardorz5', lastMessage: 'Digitando ...', time: '19:45', status: 'typing', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 1 },
      { id: 3, name: 'Leoxx', lastMessage: 'Terminei com ela mano', time: '19:42', status: 'read', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
      { id: 4, name: 'Leonardo', lastMessage: 'Beber hoje ?', time: '16:15', status: 'pending', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
      { id: 5, name: 'Nao é o leo', lastMessage: 'Mensagem excluída.', time: '08:57', status: 'temporary', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
      { id: 6, name: 'Leo', lastMessage: 'Localização', time: '08:24', status: 'location', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
      { id: 7, name: 'Leo Lima', lastMessage: 'Ok!', time: 'Ontem', status: 'read', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
      { id: 8, name: 'Aniversário do matheus', lastMessage: 'Joao: Já compraram a vodka ?', time: 'Ontem', status: 'group', avatarUrl: 'https://image.winudf.com/v2/image/Y29tLmFwcC53aGF0c2FwcC5kcC5wcm9maWxlLnBpYy5kb3dubG9hZC5zYXZlcl9pY29uXzBfYTRmYmNhODM/icon.png?w=&fakeurl=1', unreadCount: 0, isGroup: true },
    ];

    const convFormatadas = todasConv.map(chat => ({
      id: chat.id,
      contactName: chat.name,
      text: chat.lastMessage,
      timestamp: chat.time,
      isMyMessage: chat.name === 'Leo Lima' || chat.name === 'Leoxx',
      status: chat.status,
      avatarUrl: chat.avatarUrl,
      unreadCount: chat.unreadCount || 0,
      isGroup: chat.isGroup || false
    }));

    setConv(convFormatadas);
    setConvFiltradas(convFormatadas);
  }, []);

  const lidarMudaAba = (tab) => {
    setAbaAtiva(tab);
    let convFiltAtual = [];

    if (tab === 'Não lido') {
      convFiltAtual = conv.filter(chat => chat.unreadCount > 0);
    } else if (tab === 'Grupos') {
      convFiltAtual = conv.filter(chat => chat.isGroup);
    } else {
      convFiltAtual = conv;
    }
    setConvFiltradas(convFiltAtual);

    // Atualiza itemNavAtivo com base na aba clicada
    if (tab === 'Meu') {
      setItemNavAtivo('Meu');
    } else {
      setItemNavAtivo('Conversas'); // Volta para Conversas se não for a aba "Meu"
    }
  };

  const lidarMudaNav = (navItem) => {
    setItemNavAtivo(navItem);
    // Atualiza abaAtiva com base no item de navegação clicado
    if (navItem === 'Meu') {
      setAbaAtiva('Meu');
    } else {
      setAbaAtiva('Todos'); // Volta para Todos se não for o item "Meu"
      setConvFiltradas(conv); // Redefine os chats filtrados ao mudar de navegação
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/notes" element={<NotasConv />} />
        <Route path="/" element={
          <>
            <header className="App-header">
              <Cabecalho />
            </header>

            <div className="search-bar">
              <BarraPesq />
            </div>

            <div className="tabs">
              <Abas abaAtiva={abaAtiva} aoMudarAba={lidarMudaAba} />
            </div>

            <div className="content-area">
              {itemNavAtivo === 'Meu' ? (
                <PagMeu abaAtiva={abaAtiva} />
              ) : itemNavAtivo === 'Conversas' ? (
                <ListaConv msgs={convFiltradas} />
              ) : (
                <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
                  Ainda em desenvolvimento
                </div>
              )}
            </div>

            <footer className="footer-nav">
              <NavRodape itemNavAtivo={itemNavAtivo} aoMudarNav={lidarMudaNav} />
            </footer>
          </>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ConteudoApp />
    </Router>
  );
}

export default App;
