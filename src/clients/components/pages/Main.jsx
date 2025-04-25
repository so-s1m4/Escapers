import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Client, Game, Location } from 'utils/apiController.ts';
import { BASE_URL } from 'utils/fetchData.ts';
import './Main.css';

export default function Main() {
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const mainContainerRef = useRef(null);

  useEffect(() => {
    const id = localStorage.getItem('clientId');
    const pw = localStorage.getItem('clientPassword');
    if (!id || !pw) return navigate('/clients/login');
    
    // Забезпечуємо скролінг сторінки
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';

    (async () => {
      try {
        setLoading(true);
        // 1) Дані клієнта з фото
        const cr = await Client.getClient(Number(id), pw);
        const { id: cid, firstName, lastName, birthday, phone, mail, photo } = cr.data;
        setClient({ cid, firstName, lastName, birthday, phone, mail, photo });

        // 2) Кімнати + деталі
        const rr = await Client.getRoomsOfClient(Number(id), pw);
        const det = await Promise.all(rr.data.map(async (r) => {
          const gr = await Game.getLocationGameById(r.LocationId, r.GameId);
          const lr = await Location.getLocation(r.LocationId);
          return {
            gameTime: r.gameTime,
            createdAt: r.createdAt,
            game: gr.data,
            location: lr.data,
          };
        }));
        setRooms(det);
      } catch (err) {
        setError('Fehler beim Laden der Daten. Bitte versuchen Sie es später erneut.');
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    })();
    
    // Прибираємо зміни при розмонтуванні компонента
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [navigate]);

  const prev = () => setIdx(i => (i > 0 ? i - 1 : rooms.length - 1));
  const next = () => setIdx(i => (i < rooms.length - 1 ? i + 1 : 0));
  
  // Відображення стану завантаження
  if (loading) {
    return (
      <div className="app-wrapper">
        <div className="main-container" ref={mainContainerRef}>
          <h1 className="logo">ESCAPERS</h1>
          <div className="loader"></div>
          <p className="loading-text">Laden...</p>
        </div>
      </div>
    );
  }

  // Відображення помилки
  if (error) {
    return (
      <div className="app-wrapper">
        <div className="main-container" ref={mainContainerRef}>
          <h1 className="logo">ESCAPERS</h1>
          <div className="error-message">{error}</div>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  // Захист від null
  if (!client) return null;

  // Якщо жодної гри немає, показати повідомлення
  if (!rooms.length) {
    return (
      <div className="app-wrapper">
        <div className="main-container" ref={mainContainerRef}>
          <h1 className="logo">ESCAPERS</h1>
          
          <div className="profile-section">
            <div className="profile-header">
              <h2>Benutzerprofil</h2>
            </div>
            
            <div className="profile-container">
              <div className="profile-photo-container">
                <img
                  src={`${BASE_URL}/public/${client.photo}`}
                  alt="Benutzer"
                  className="profile-photo"
                />
              </div>
              <div className="profile-info">
                <p><span className="info-label">ID:</span> {client.cid}</p>
                <p><span className="info-label">Name:</span> {client.firstName} {client.lastName}</p>
                <p><span className="info-label">Geburtsdatum:</span> {new Date(client.birthday).toLocaleDateString()}</p>
                <p><span className="info-label">Telefon:</span> {client.phone}</p>
                <p><span className="info-label">E-Mail:</span> {client.mail}</p>
              </div>
            </div>
          </div>

          <div className="no-games-message">
            <div className="icon-no-games">🎮</div>
            <p>Sie haben noch nicht gespielt</p>
            <p className="subtext">Nehmen Sie an Spielen teil, um Ihre Geschichte hier zu sehen</p>
          </div>
        </div>
      </div>
    );
  }

  const cur = rooms[idx];

  return (
    <div className="app-wrapper">
      <div className="main-container" ref={mainContainerRef}>
        {/* Логотип */}
        <h1 className="logo">ESCAPERS</h1>

        {/* Профіль клієнта */}
        <div className="profile-section">
          {/* <div className="profile-header">
            <h2>Benutzerprofil</h2>
          </div> */}
          
          <div className="profile-container">
            <div className="profile-photo-container">
              <img
                src={`${BASE_URL}/public/${client.photo}`}
                alt="Benutzer"
                className="profile-photo"
              />
            </div>
            <div className="profile-info">
              <p><span className="info-label">ID:</span> {client.cid}</p>
              <p><span className="info-label">Name:</span> {client.firstName} {client.lastName}</p>
              <p><span className="info-label">Geburtsdatum:</span> {new Date(client.birthday).toLocaleDateString()}</p>
              <p><span className="info-label">Telefon:</span> {client.phone}</p>
              <p><span className="info-label">E-Mail:</span> {client.mail}</p>
            </div>
          </div>
        </div>

        {/* Секція історії ігор */}
        <div className="games-section">
          <div className="section-header">
            <h2>Ihre Spiele</h2>
            <div className="game-counter">{idx + 1} / {rooms.length}</div>
          </div>

          {/* Слайдер однієї гри */}
          <div className="game-slider">
            <button className="slide-btn prev" onClick={prev} aria-label="Vorheriges Spiel">
              &lsaquo;
            </button>
            
            <div className="slide-card">
              <div className="game-image-container">
                <img
                  className="game-photo"
                  src={`${BASE_URL}/public/${cur.game.icon}`}
                  alt={cur.game.name}
                />
              </div>
              
              <div className="game-details">
                <h3 style={{ color: cur.game.color }}>{cur.game.name}</h3>
                
                <div className="game-info">
                  <div className="info-row">
                    <span className="info-icon">⏱️</span>
                    <span className="info-text"><strong>Spielzeit:</strong> {cur.gameTime} min</span>
                  </div>
                  
                  <div className="info-row">
                    <span className="info-icon">📅</span>
                    <span className="info-text">
                      <strong>Datum:</strong> {new Date(cur.createdAt).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="info-row">
                    <span className="info-icon">📍</span>
                    <span className="info-text">
                      <strong>Ort:</strong> {cur.location.address}, {cur.location.city}, {cur.location.postcode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="slide-btn next" onClick={next} aria-label="Nächstes Spiel">
              &rsaquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}