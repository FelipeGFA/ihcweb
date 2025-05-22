import React, { useState, useEffect } from 'react';
import './styles/StatusOpenPage.css';
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";

function StatusOpenPage({ status, onClose }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('StatusOpenPage: useEffect iniciado');
    const duration = 5000; // 5 segundos
    const intervalTime = 50; // Atualiza a cada 50ms
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);
      console.log('StatusOpenPage: Progresso atual:', newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        console.log('StatusOpenPage: Temporizador concluído, chamando onClose()');
        onClose(); // Fecha a página quando o temporizador termina
      }
    }, intervalTime);

    return () => {
      clearInterval(timer); // Limpa o temporizador ao desmontar o componente
      console.log('StatusOpenPage: Temporizador limpo.');
    };
  }, [onClose]);

  if (!status) {
    return <div>Status não encontrado.</div>;
  }

  return (
    <div className="status-open-page">
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="status-open-header">
        <IoArrowBack className="back-icon" onClick={onClose} />
        <div className="user-info">
          <img src={status.avatarUrl} alt="User" className="profile-pic-open" />
          <div>
            <h2>{status.name}</h2>
            <p>{status.time}</p>
          </div>
        </div>
        <HiOutlineDotsVertical className="more-icon" />
      </div>

      <div className="status-content">
        <p>{status.content}</p>
      </div>

      <div className="status-footer">
        <IoIosArrowUp className="arrow-up" />
        <p>RESPONDER</p>
      </div>
    </div>
  );
}

export default StatusOpenPage;
