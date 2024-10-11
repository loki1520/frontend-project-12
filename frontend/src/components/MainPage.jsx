import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const MainPage = () => {
  const [token, setToken] = useState('');
  const { location, navigate } = useAuth();

  // if token is missing, redirect to login page
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (!userId || !userId.token) {
      navigate('/login', { state: { from: location } });
    } else {
      setToken(userId.token);
    }
  }, [navigate, location]);

  useEffect(() => {
    const fetchChannels = async () => {
      if (token) {
        try {
          const response = await axios.get(routes.channelsPath(), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data); // => [{ id: '1', name: 'general', removable: false }, ...]
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      }
    };

    fetchChannels();
  }, [token]);

  return (
    <h1>
      {token}
    </h1>
  );
};

export default MainPage;
