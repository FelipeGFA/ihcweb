import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Adicionar useNavigate e useLocation
import './styles/App.css';
import NotasConv from './NotesChat';
import StatusOpenPage from './StatusOpenPage'; // Importar o novo componente
import MainLayout from './MainLayout'; // Importar o novo componente MainLayout

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
      { name: 'Nao é o leo', time: '4h atrás...', avatarUrl: todasConv.find(c => c.name === 'Nao é o leo')?.avatarUrl, content: 'Lâmina: se matar\nEu: mas eu tenho amigos😔💔\nLâmina: e onde eles tar\nVô ser feliz nunk?🐣' },
      { name: 'Vida ❤️', time: '9h atrás...', avatarUrl: todasConv.find(c => c.name === 'Vida ❤️')?.avatarUrl, content: 'Bom dia! ☀️' },
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
    console.log('handleSelectStatus: Objeto recebido:', selectedChatOrStatus);
    // Tenta encontrar o status completo em statusData
    const nameToCompare = selectedChatOrStatus.name || selectedChatOrStatus.contactName;
    const foundStatus = statusData.find((s) => {
      console.log(`handleSelectStatus: Comparando statusData.name "${s.name}" com nameToCompare "${nameToCompare}"`);
      return s.name === nameToCompare;
    });

    if (foundStatus) {
      setSelectedStatus(foundStatus);
      console.log('Status completo encontrado e selecionado:', foundStatus);
    } else {
      // Se não encontrar em statusData, cria um objeto de status básico com uma mensagem padrão
      // Usa as propriedades que são passadas pelo ChatItem
      setSelectedStatus({
        name: nameToCompare || 'Contato Desconhecido', // Usa nameToCompare
        avatarUrl: selectedChatOrStatus.avatarUrl || 'https://via.placeholder.com/50', // Pode ser undefined se vier do ChatItem
        time: selectedChatOrStatus.time || '', // Pode ser undefined se vier do ChatItem
        content: 'Este contato não possui um status disponível.' // Mensagem padrão
      });
      console.log('Nenhum status completo encontrado, usando objeto de status padrão:', selectedChatOrStatus);
    }
    navigate('/status-open');
  };

  const handleCloseStatus = () => {
    console.log('App.js: handleCloseStatus chamado. Voltando para:', previousLocation);
    setSelectedStatus(null);
    navigate(previousLocation); // Volta para a localização anterior
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
    } else if (navItem === 'Status') {
      setAbaAtiva('Status');
    } else if (navItem === 'Telefone') {
      setAbaAtiva('Telefone');
    }
    else {
      setAbaAtiva('Todos'); // Volta para Todos se não for o item "Meu"
      setConvFiltradas(conv); // Redefine os chats filtrados ao mudar de navegação
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/notes" element={<NotasConv />} />
        <Route path="/status-open" element={<StatusOpenPage status={selectedStatus} onClose={handleCloseStatus} />} />
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
