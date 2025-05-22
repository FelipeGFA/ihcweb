import React from 'react';
import './styles/StatusPage.css';
import { BiSolidCameraPlus } from "react-icons/bi";
import { HiPencil } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";

function StatusPage({ statusUpdates, myStatusAvatarUrl, handleSelectStatus }) { // Adicionar handleSelectStatus
  return (
    <div className="status-page">
      <div className="header">
        <h1>Status</h1>
      </div>

      <div className="my-status">
        <div className="profile-pic-container">
          <img src={myStatusAvatarUrl} alt="Profile" className="profile-pic" />
          <span className="add-icon">+</span>
        </div>
        <div className="status-text">
          <h2>Meu status...</h2>
          <p>Adicionar ao meu status...</p>
        </div>
        <div className="status-icons">
          <BiSolidCameraPlus className="icon" />
          <HiPencil className="icon" />
        </div>
      </div>

      <h3>Atualizações recentes</h3>
      <div className="recent-updates">
        {statusUpdates.map((update, index) => (
          <div className="update-item" key={index} onClick={() => handleSelectStatus(update)}> {/* Adicionar onClick */}
            <img src={update.avatarUrl} alt="User" className="profile-pic-small" />
            <div className="update-details">
              <h4>{update.name}</h4>
              <p>{update.time}</p>
            </div>
          </div>
        ))}
      </div>

      <h3>Canais</h3>
      <p>Mantenha-se atualizado sobre os assuntos do seu interesse. Encontre canais para seguir abaixo.</p>
      <div className="find-channels">
        <p>Encontre canais para seguir</p>
        <IoIosArrowDown className="arrow-down" />
      </div>
      <button className="explore-button">Explorar mais</button>
    </div>
  );
}

export default StatusPage;
