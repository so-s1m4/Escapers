import React, { useState } from 'react';                    // імпорт хука useState :contentReference[oaicite:0]{index=0}
import './Login.css';                                        // підключення стилів
import { Client } from 'utils/apiController.ts';            // імпорт API-клієнта
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');                         // стан для поля ID :contentReference[oaicite:1]{index=1}
  const [password, setPassword] = useState('');             // стан для пароля :contentReference[oaicite:2]{index=2}
  const [error, setError] = useState(null);                 // стан для повідомлення про помилку :contentReference[oaicite:3]{index=3}


  const handleSubmit = async (e) => {
    e.preventDefault();                                      // відміняємо перезавантаження сторінки при submit :contentReference[oaicite:4]{index=4}
    try {
      // Виклик статичного методу API для отримання кімнат клієнта :contentReference[oaicite:5]{index=5}
      await Client.getRoomsOfClient(Number(id), password);
      // Зберігаємо дані в localStorage :contentReference[oaicite:6]{index=6}
      localStorage.setItem('clientId', id);
      localStorage.setItem('clientPassword', password);
      await Client.getClient(Number(id), password)

      navigate('/clients')                              // виводимо відповідь у консоль :contentReference[oaicite:7]{index=7}
      
      setError(null);
    } catch (err) {
      console.error(err);                                    // помилка запиту :contentReference[oaicite:8]{index=8}
      setError('Authentication failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="login-error">{error}</p>}
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={e => setId(e.target.value)}               // оновлення стану при зміні поля :contentReference[oaicite:9]{index=9}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}         // оновлення стану при зміні поля :contentReference[oaicite:10]{index=10}
          className="login-input"
        />
        <button type="submit" className="login-button">Submit</button>
      </form>
    </div>
  );
}
