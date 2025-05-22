import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './styles/App.css';
import NotasConv from './NotesChat';
import StatusOpenPage from './StatusOpenPage';
import MainLayout from './MainLayout';
import ChatScreen from './ChatScreen'; // Importar o novo componente ChatScreen

const todasConv = [
  { id: 1, name: 'Vida ❤️', lastMessage: 'Você reagiu com 😘 a mensagem "te amo"', time: '16:14', status: 'pinned', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
  { id: 2, name: 'Leonardorz5', lastMessage: 'Digitando ...', time: '19:45', status: 'typing', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 1 },
  { id: 3, name: 'Leoxx', lastMessage: 'Terminei com ela mano', time: '19:42', status: 'read', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
  { id: 4, name: 'Leonardo', lastMessage: 'Beber hoje ?', time: '16:15', status: 'pending', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
  { id: 5, name: 'Nao é o leo', lastMessage: 'Mensagem excluída.', time: '08:57', status: 'blocked', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
  { id: 6, name: 'Leo', lastMessage: 'Localização', time: '08:24', status: 'location', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
  { id: 7, name: 'Leo Lima', lastMessage: 'Ok!', time: 'Ontem', status: 'read', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s', unreadCount: 0 },
  { id: 8, name: 'Aniversário do matheus', lastMessage: 'Joao: Já compraram a vodka ?', time: 'Ontem', status: 'group', avatarUrl: 'https://image.winudf.com/v2/image/c29tLmFwcC53aGF0c2FwcC5kcC5wcm9maWxlLnBpYy5kb3dubG9hZC5zYXZlcl9pY29uXzBfYTRmYmNhODM/icon.png?w=&fakeurl=1', unreadCount: 0, isGroup: true },
];

function ConteudoApp() {
  const [abaAtiva, setAbaAtiva] = useState('Todos');
  const [itemNavAtivo, setItemNavAtivo] = useState('Conversas');
  const [conv, setConv] = useState([]);
  const [convFiltradas, setConvFiltradas] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null); // Novo estado para o status selecionado
  const [previousLocation, setPreviousLocation] = useState('/'); // Novo estado para a localização anterior
  const navigate = useNavigate(); // Inicializar useNavigate
  const location = useLocation(); // Inicializar useLocation

  useEffect(() => {
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

    const statusUpdates = [
      { id: 1, name: 'Nao é o leo', time: '4h atrás...', avatarUrl: todasConv.find(c => c.name === 'Nao é o leo')?.avatarUrl, content: 'Lâmina: se matar\nEu: mas eu tenho amigos😔💔\nLâmina: e onde eles tar\nVô ser feliz nunk?🐣' },
      { id: 2, name: 'Vida ❤️', time: '9h atrás...', avatarUrl: todasConv.find(c => c.name === 'Vida ❤️')?.avatarUrl, content: 'Bom dia! ☀️' },
    ];
    setStatusData(statusUpdates);
  }, []);

  useEffect(() => {
    // Salva a localização atual antes de navegar para /status-open
    if (location.pathname !== '/status-open') {
      setPreviousLocation(location.pathname);
    }
  }, [location]);

  const handleSelectStatus = (selectedChatOrStatus) => {
    const nameToCompare = selectedChatOrStatus.name || selectedChatOrStatus.contactName;
    const foundStatus = statusData.find((s) => s.name === nameToCompare);

    if (foundStatus) {
      setSelectedStatus(foundStatus);
    } else {
      setSelectedStatus({
        name: nameToCompare || 'Contato Desconhecido',
        avatarUrl: selectedChatOrStatus.avatarUrl || 'https://via.placeholder.com/50',
        time: selectedChatOrStatus.time || '',
        content: 'Este contato não possui um status disponível.'
      });
    }
    navigate('/status-open');
  };

  const handleCloseStatus = () => {
    setSelectedStatus(null);
    navigate(previousLocation);
  };

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

    setItemNavAtivo(tab === 'Meu' ? 'Meu' : 'Conversas');
  };

  const lidarMudaNav = (navItem) => {
    setItemNavAtivo(navItem);
    setAbaAtiva(navItem === 'Meu' || navItem === 'Status' || navItem === 'Telefone' ? navItem : 'Todos');
    if (navItem !== 'Meu' && navItem !== 'Status' && navItem !== 'Telefone') {
      setConvFiltradas(conv);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/notes" element={<NotasConv />} />
        <Route path="/status-open" element={<StatusOpenPage status={selectedStatus} onClose={handleCloseStatus} />} />
        <Route
          path="/chat/:name"
          element={<ChatScreen />}
        />
        <Route path="/" element={
          <MainLayout
            abaAtiva={abaAtiva}
            aoMudarAba={lidarMudaAba}
            itemNavAtivo={itemNavAtivo}
            convFiltradas={convFiltradas}
            handleSelectStatus={handleSelectStatus}
            statusData={statusData}
            myStatusAvatarUrl={todasConv.find(c => c.name === 'Vida ❤️')?.avatarUrl || 'https://via.placeholder.com/50'}
            lidarMudaNav={lidarMudaNav}
          />
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
