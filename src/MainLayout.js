import React from 'react';
import Cabecalho from './Header';
import BarraPesq from './SearchBar';
import Abas from './Tabs';
import ListaConv from './ChatList';
import PagMeu from './MeuPage';
import NavRodape from './FooterNav';
import StatusPage from './StatusPage';
import TelefonePage from './TelefonePage';

function MainLayout({ abaAtiva, aoMudarAba, itemNavAtivo, convFiltradas, handleSelectStatus, statusData, myStatusAvatarUrl, lidarMudaNav }) {
  return (
    <div>
      <header className="App-header">
        <Cabecalho />
      </header>

      <div className="search-bar">
        <BarraPesq />
      </div>

      <div className="tabs">
        <Abas abaAtiva={abaAtiva} aoMudarAba={aoMudarAba} />
      </div>

      <div className="content-area">
        {itemNavAtivo === 'Meu' ? (
          <PagMeu abaAtiva={abaAtiva} />
        ) : itemNavAtivo === 'Conversas' ? (
          <ListaConv msgs={convFiltradas} handleSelectStatus={handleSelectStatus} />
        ) : itemNavAtivo === 'Status' ? (
          <StatusPage statusUpdates={statusData} myStatusAvatarUrl={myStatusAvatarUrl} handleSelectStatus={handleSelectStatus} />
        ) : itemNavAtivo === 'Telefone' ? (
          <TelefonePage />
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
            Ainda em desenvolvimento
          </div>
        )}
      </div>

      <footer className="footer-nav">
        <NavRodape itemNavAtivo={itemNavAtivo} aoMudarNav={lidarMudaNav} />
      </footer>
    </div>
  );
}

export default MainLayout;
