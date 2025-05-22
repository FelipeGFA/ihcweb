import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Remover useNavigate
import './styles/App.css';
import Header from './Header';
import SearchBar from './SearchBar';
import Tabs from './Tabs';
import ChatList from './ChatList';
import MeuPage from './MeuPage';
import NotesChat from './NotesChat'; // Importar NotesChat
import FooterNav from './FooterNav';

function AppContent() { // Renomear App para AppContent para ser envolvido por Router
  const [activeTab, setActiveTab] = useState('Todos');
  const [activeNavItem, setActiveNavItem] = useState('Conversas');
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  // Remover const navigate = useNavigate();

  // Mock data for chats (replace with actual data fetching)
  useEffect(() => {
    const allChats = [
      { id: 1, name: 'Vida ❤️', lastMessage: 'Você reagiu com a mensagem "te amo"', time: '16:14', status: 'pinned', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
      { id: 2, name: 'Leonardorz5', lastMessage: 'Digitando ...', time: '19:45', status: 'typing', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 1 },
      { id: 3, name: 'Leoxx', lastMessage: 'Terminei com ela mano', time: '19:42', status: 'read', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
      { id: 4, name: 'Leonardo', lastMessage: 'Beber hoje ?', time: '16:15', status: 'pending', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
      { id: 5, name: 'Nao é o leo', lastMessage: 'Mensagem excluída.', time: '08:57', status: 'temporary', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
      { id: 6, name: 'Leo', lastMessage: 'Localização', time: '08:24', status: 'location', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
      { id: 7, name: 'Leo Lima', lastMessage: 'Ok!', time: 'Ontem', status: 'read', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
      { id: 8, name: 'Aniversário do matheus', lastMessage: 'Joao: Já compraram a vodka ?', time: 'Ontem', status: 'group', avatarUrl: 'https://image.winudf.com/v2/image/Y29tLmFwcC53aGF0c2FwcC5kcC5wcm9maWxlLnBpYy5kb3dubG9hZC5zYXZlcl9pY29uXzBfYTRmYmNhODM/icon.png?w=&fakeurl=1', unreadCount: 0, isGroup: true },
    ];

    const formattedChats = allChats.map(chat => ({
      id: chat.id,
      contactName: chat.name,
      text: chat.lastMessage,
      timestamp: chat.time,
      isMyMessage: chat.name === 'Leo Lima' || chat.name === 'Leoxx',
      status: chat.status,
      avatarUrl: chat.avatarUrl,
      unreadCount: chat.unreadCount || 0, // Garante que unreadCount seja sempre um número
      isGroup: chat.isGroup || false // Adiciona a propriedade isGroup
    }));

    setChats(formattedChats);
    setFilteredChats(formattedChats);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    let currentFilteredChats = [];

    if (tab === 'Não lido') {
      currentFilteredChats = chats.filter(chat => chat.unreadCount > 0);
    } else if (tab === 'Grupos') {
      currentFilteredChats = chats.filter(chat => chat.isGroup);
    } else {
      currentFilteredChats = chats;
    }
    setFilteredChats(currentFilteredChats);

    // Se a aba "Meu" for clicada, também atualiza o item de navegação
    if (tab === 'Meu') {
      setActiveNavItem('Meu');
    } else if (activeNavItem === 'Meu' && tab !== 'Meu') {
      // Se estava na aba "Meu" e mudou para outra aba que não é "Meu", volta para "Conversas"
      setActiveNavItem('Conversas');
    }
  };

  const handleNavChange = (navItem) => {
    setActiveNavItem(navItem);
    // Se o item de navegação for "Meu", a aba ativa deve ser "Meu"
    if (navItem === 'Meu') {
      setActiveTab('Meu');
    } else {
      // Se o item de navegação não for "Meu", a aba ativa deve ser "Todos" e os chats devem ser redefinidos
      setActiveTab('Todos');
      setFilteredChats(chats);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/notes" element={<NotesChat />} />
        <Route path="/" element={
          <>
            <header className="App-header">
              <Header />
            </header>

            <div className="search-bar">
              <SearchBar />
            </div>

            <div className="tabs">
              <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
            </div>

            <div className="content-area">
              {activeNavItem === 'Meu' ? (
                <MeuPage activeTab={activeTab} />
              ) : activeNavItem === 'Conversas' ? (
                <ChatList messages={filteredChats} />
              ) : (
                <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
                  Ainda em desenvolvimento
                </div>
              )}
            </div>

            <footer className="footer-nav" style={{ boxShadow: 'none', border: 'none' }}>
              <FooterNav activeNavItem={activeNavItem} onNavChange={handleNavChange} />
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
      <AppContent />
    </Router>
  );
}

export default App;
