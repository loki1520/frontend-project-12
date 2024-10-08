import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [token, setToken] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    // Проверяем наличие токена
    if (!userId || !userId.token) {
      // Если токен отсутствует, перенаправляем на страницу логина
      navigate('/login', { state: { from: location } });
    } else {
      // Если токен есть, сохраняем его в состоянии
      setToken(userId.token);
    }
  }, [navigate, location]);

  return (
    <h1>
      {token}
    </h1>
  );
};

export default MainPage;
