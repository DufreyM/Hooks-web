import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Asegúrate de importar el archivo de estilo

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0); 
  const [sessions, setSessions] = useState([]);
  const intervalRef = useRef(null); 

  // useEffect para iniciar/detener el intervalo
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    // Limpieza del intervalo al desmontar o cuando cambia isRunning
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleRunning = () => {
    setIsRunning(prev => !prev);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const saveSession = () => {
    setSessions(prevSessions => [...prevSessions, time]);
  };

  // Formato mm:ss
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-title">Stopwatch</h1>
      <div className="stopwatch-display">
        <h2>{formatTime(time)}</h2>
        <div className="stopwatch-buttons">
          <button onClick={toggleRunning} className="start-stop-btn">
            {isRunning ? 'Pausar' : 'Iniciar'}
          </button>
          <button onClick={reset} className="reset-btn">Reiniciar</button>
          <button onClick={saveSession} className="save-btn">Guardar sesión</button>
        </div>
      </div>

      <h3>Sesiones guardadas:</h3>
      <ul className="sessions-list">
        {sessions.map((s, index) => (
          <li key={index} className="session-item">
            Sesión {index + 1}: {formatTime(s)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;
