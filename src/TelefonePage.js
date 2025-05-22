import React from 'react';
import './styles/TelefonePage.css';
import { IoInformationCircleOutline } from "react-icons/io5";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";

const callData = [
  {
    id: 1,
    name: 'Amante',
    type: 'Transmitida',
    time: '14:01',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s',
  },
  {
    id: 2,
    name: 'Amante',
    type: 'Perdida',
    time: '14:00',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s',
  },
  {
    id: 3,
    name: 'Amante',
    type: 'Transmitida',
    time: 'Ontem',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s',
  },
  {
    id: 4,
    name: 'vida ❤️',
    type: 'Transmitida',
    time: '15/10/85',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s',
  },
  {
    id: 5,
    name: 'vida ❤️',
    type: 'Perdida',
    time: '11/10/85',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s',
  },
  {
    id: 6,
    name: 'Amante de sabado',
    type: 'Transmitida',
    time: '02/09/85',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s',
  },
];

function CallItem({ name, type, time, avatarUrl }) {
  const CallIcon = type === 'Transmitida' ? BsFillTelephoneOutboundFill : BsFillTelephoneInboundFill;
  const callTypeClass = type === 'Perdida' ? 'call-type-perdida' : '';

  return (
    <div className="call-item">
      <img src={avatarUrl} alt={name} className="call-avatar" />
      <div className="call-details">
        <span className="call-name">{name}</span>
        <div className={`call-info ${callTypeClass}`}>
          <CallIcon className="call-icon" />
          <span className="call-type">{type}</span>
        </div>
      </div>
      <div className="call-time-info">
        <span className="call-time">{time}</span>
        <IoInformationCircleOutline className="info-icon" />
      </div>
    </div>
  );
}

function TelefonePage() {
  return (
    <div className="telefone-page">
      <div className="header-telefone">
        <h2>Chamadas</h2>
      </div>
      <div className="favoritos">
        <h3>Favoritos</h3>
        <div className="adicionar-favoritos">
          <span>+ Adicionar favoritos</span>
        </div>
      </div>
      <div className="recentes">
        <h3>Recentes</h3>
        {callData.map(call => (
          <CallItem
            key={call.id}
            name={call.name}
            type={call.type}
            time={call.time}
            avatarUrl={call.avatarUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default TelefonePage;
