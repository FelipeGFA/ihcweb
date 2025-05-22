import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './Header';
import SearchBar from './SearchBar';
import Tabs from './Tabs';
import ChatList from './ChatList';
import MeuPage from './MeuPage';
import FooterNav from './FooterNav';

function App() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [activeNavItem, setActiveNavItem] = useState('Conversas');
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);

  // Mock data for chats (replace with actual data fetching)
  useEffect(() => {
    // Mock data for chats com status e avatarUrl já definidos
    const allChats = [
      { id: 1, name: 'Vida ❤️', lastMessage: 'Você reagiu com a mensagem "te amo"', time: '16:14', status: 'pinned', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s' },
      { id: 2, name: 'Leonardorz5', lastMessage: 'Digitando ...', time: '19:45', status: 'typing', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s' },
      { id: 3, name: 'Leoxx', lastMessage: 'Terminei com ela mano', time: '19:42', status: 'read', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s' },
      { id: 4, name: 'Leonardo', lastMessage: 'Beber hoje ?', time: '16:15', status: 'pending', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s' },
      { id: 5, name: 'Nao é o leo', lastMessage: 'Mensagem excluída.', time: '08:57', status: 'temporary', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s' },
      { id: 6, name: 'Leo', lastMessage: 'Localização', time: '08:24', status: 'location', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s' },
      { id: 7, name: 'Leo Lima', lastMessage: 'Ok!', time: 'Ontem', status: 'read', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s' },
      { id: 8, name: 'Aniversário do matheus', lastMessage: 'Joao: Já compraram a vodka ?', time: 'Ontem', status: 'group', avatarUrl: 'placeholder-group-avatar.png' },
    ];

    // Mapeia os dados mockados para o formato esperado pelo ChatItem
    const formattedChats = allChats.map(chat => ({
      id: chat.id,
      contactName: chat.name,
      text: chat.lastMessage,
      timestamp: chat.time,
      isMyMessage: chat.name === 'Leo Lima' || chat.name === 'Leoxx', // Exemplo de lógica (manter por enquanto)
      status: chat.status,
      avatarUrl: chat.avatarUrl
    }));

    setChats(formattedChats);
    setFilteredChats(formattedChats);
  }, []); // Array de dependências vazio

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Lógica de sincronização de abas e footer (manter por enquanto)
    if (tab === 'Meu') {
      setActiveNavItem('Meu');
    } else {
      if (activeNavItem === 'Meu') {
        setActiveNavItem('Conversas');
      }
    }

    // Lógica de filtro (manter por enquanto, embora básica)
    if (tab === 'Não lido') {
      setFilteredChats(chats.filter(chat => chat.status === 'unread')); // Filtrar por status 'unread'
    } else {
      setFilteredChats(chats);
    }
  };

  const handleNavChange = (navItem) => {
    setActiveNavItem(navItem);
    // Lógica de sincronização de abas e footer (manter por enquanto)
    if (navItem === 'Meu') {
      setActiveTab('Meu');
    } else {
      if (activeTab === 'Meu') {
        setActiveTab('Todos');
      }
    }

    // Resetar filtro de chats ao mudar de item de navegação inferior (manter por enquanto)
    if (navItem !== 'Meu') {
       setFilteredChats(chats);
       setActiveTab('Todos');
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <Header />
      </header>

      {/* Search Bar */}
      <div className="search-bar">
        <SearchBar />
      </div>

      {/* Tabs */}
      <div className="tabs">
        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Content Area - Conditional rendering based on activeTab */}
      <div className="content-area">
        {activeTab === 'Meu' ? <MeuPage /> : <ChatList messages={filteredChats} />}
      </div>

      {/* Footer Navigation */}
      <footer className="footer-nav" style={{ boxShadow: 'none', border: 'none' }}>
        <FooterNav activeNavItem={activeNavItem} onNavChange={handleNavChange} />
      </footer>
    </div>
  );
}

export default App;
