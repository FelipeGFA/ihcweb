import React from 'react';
import './styles/Tabs.css';

function Tabs({ activeTab, onTabChange }) {
  return (
    <div className="tabs-container">
      <button 
        className={`tab ${activeTab === 'Todos' ? 'active' : ''}`}
        onClick={() => onTabChange('Todos')}
      >
        Todos
      </button>
      <button 
        className={`tab ${activeTab === 'Não lido' ? 'active' : ''}`}
        onClick={() => onTabChange('Não lido')}
      >
        Não lido
      </button>
      <button 
        className={`tab ${activeTab === 'Meu' ? 'active' : ''}`}
        onClick={() => onTabChange('Meu')}
      >
        Meu
      </button>
      <button 
        className={`tab ${activeTab === 'Grupos' ? 'active' : ''}`}
        onClick={() => onTabChange('Grupos')}
      >
        Grupos
      </button>
      <button className="tab-add">+</button>
    </div>
  );
}

export default Tabs;
