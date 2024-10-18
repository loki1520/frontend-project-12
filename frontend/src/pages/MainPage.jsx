import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAuth from '../hooks/useAuth.jsx';
import { fetchChannels, fetchMessages } from '../services/chat.js';
import ChatForm from '../components/ChatForm.jsx';

const MainPage = () => {
  const { user, logOut } = useAuth();

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);

  const [activeChannelId, setActiveChannelId] = useState(null);
  const [activeChannelName, setActiveChannelName] = useState('general');
  // const activeChannelName = channels
  //   .channelsList.find((el) => el.id === activeChannelId)?.name || 'general';

  useEffect(() => {
    if (!user) return;
    const { token } = user;

    fetchChannels(token, dispatch);
    fetchMessages(token, dispatch);
  }, [user, dispatch]);

  // Устанавливаем активный канал при загрузке данных
  useEffect(() => {
    if (channels.channelsList.length > 0) {
      setActiveChannelId(channels.channelsList[0].id);
      setActiveChannelName(channels.channelsList[0].name);
    }
  }, [channels]);

  return (
    <div className="bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            {/* Шапка */}
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">
                  Hexlet Chat
                </a>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={logOut}
                >
                  Выйти
                </button>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                      </svg>
                      <span className="visually-hidden">+</span>
                    </button>
                  </div>
                  <ul
                    id="channels-box"
                    className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
                    style={{ minHeight: '74vh' }}
                  >
                    {channels.channelsList.map((element) => (
                      <li
                        key={element.id}
                        className="nav-item w-100"
                        style={{ listStyleType: 'none', paddingLeft: 0 }} // Убираем маркер и отступ
                      >
                        <button
                          onClick={() => {
                            setActiveChannelId(element.id);
                            setActiveChannelName(element.name);
                          }}
                          type="button"
                          className={`w-100 rounded-0 text-start btn d-flex align-items-center justify-content-center
                            ${element.id === activeChannelId ? 'btn-secondary' : ''}`}
                        >
                          <span className="me-1">#</span>
                          {element.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Чат */}
                <div className="col p-0 h-100 d-flex flex-column">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                      <b>
                        {`# ${activeChannelName}`}
                      </b>
                    </p>
                    <span className="text-muted">
                      {`${messages.messagesList.length} сообщений`}
                    </span>
                  </div>
                  <div
                    id="messages-box"
                    className="chat-messages overflow-auto px-5"
                    style={{ minHeight: '63vh' }}
                  />
                  <ChatForm />
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
