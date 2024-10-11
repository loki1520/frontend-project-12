import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import {
  addChannels,
} from '../slices/channelsSlice.js';
import {
  addMessages,
} from '../slices/messagesSlice.js';

const MainPage = () => {
  const [token, setToken] = useState('');
  const { location, navigate } = useAuth();

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);

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
      try {
        const responseChannels = await axios.get(routes.channelsPath(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // [{ id: '1', name: 'general', removable: false }, ...]
        dispatch(addChannels(responseChannels.data));
        // const responseMessges = await axios.get('/api/v1/messages', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        // dispatch(addMessages(responseMessges.data));
        // [{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchChannels();
  }, [token, dispatch]);

  return (
    <h1>
      {JSON.stringify(channels.channelsList, null, ' ')}
    </h1>
  );
};

export default MainPage;
