import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import {
  getChannels,
} from '../slices/channelsSlice.js';
import {
  getMessages,
} from '../slices/messagesSlice.js';

const MainPage = () => {
  const [token, setToken] = useState('');
  const { location, navigate } = useAuth();

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);

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
          const responseChannels = await axios.get(routes.channelsPath(), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // [{ id: '1', name: 'general', removable: false }, ...]
          dispatch(getChannels(responseChannels.data));

          const responseMessges = await axios.get(routes.messagesPath(), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(getMessages(responseMessges.data));
          // [{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      }
    };
    fetchChannels();
  }, [token, dispatch]);

  // для отслеживания изменения токена
  useEffect(() => {
    console.log('token 🍀===>>', token);
  }, [token]);

  return (
    <div className="bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            {/* Шапка */}
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">Hexlet Chat</a>
                <button type="button" className="btn btn-primary">Выйти</button>
              </div>
            </nav>
            {/* Основное содержимое */}
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
                {/* Список каналов */}
                <div className="col-4 col-md-2 border-end px-0 bg-light d-flex flex-column h-100">
                  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                    <b>Каналы</b>
                    <button type="button" className="p-0 text-primary btn btn-group-vertical">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                      </svg>
                      <span className="visually-hidden">+</span>
                    </button>
                  </div>

                  <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" style={{ minHeight: '74vh' }}>
                    <li className="nav-item w-100">
                      <button type="button" className="w-100 rounded-0 text-start btn">
                        <span className="me-1">#</span>
                        general
                      </button>
                    </li>
                    <li className="nav-item w-100">
                      <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
                        <span className="me-1">#</span>
                        random
                      </button>
                    </li>
                  </ul>
                </div>
                {/* Чат */}
                <div className="col p-0 h-100 d-flex flex-column">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0"><b># random</b></p>
                    <span className="text-muted">0 сообщений</span>
                  </div>

                  <div id="messages-box" className="chat-messages overflow-auto px-5" style={{ minHeight: '63vh' }} />

                  <div className="mt-auto px-5 py-3">
                    <form noValidate className="py-1 border rounded-2">
                      <div className="input-group has-validation">
                        <input
                          name="body"
                          aria-label="Новое сообщение"
                          placeholder="Введите сообщение..."
                          className="border-0 p-0 ps-2 form-control"
                          value=""
                        />
                        <button type="submit" disabled className="btn btn-group-vertical">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                          </svg>
                          <span className="visually-hidden">Отправить</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
