import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import routes from '../routes';
import useAuth from '../hooks/useAuth.js';
import { getMessages } from '../slices/messagesSlice.js';
import ChatForm from './MessagesForm.jsx';

const Messages = () => {
  filter.add(filter.getDictionary('ru'));

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { user } = useAuth();

  const { channelsList, currentChannelId } = useSelector((state) => state.channels);
  const { messagesList } = useSelector((state) => state.messages);

  const activeChannelName = channelsList.find((el) => el.id === currentChannelId)?.name || 'general';

  const activeMessages = messagesList
    .filter(({ channelId }) => channelId === currentChannelId);

  // Реф на контейнер с сообщениями
  const messagesBoxRef = useRef(null);
  // Прокрутка контейнера вниз при изменении сообщений
  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [activeMessages]);

  useEffect(() => {
    if (!user) return;
    const { token } = user;
    const fetchMessages = async () => {
      try {
        const responseMessages = await axios.get(routes.messagesPath(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        // => [{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
        dispatch(getMessages(responseMessages.data));
      } catch (error) {
        toast.error(t('errors.getChannels'));
        console.error(t('errors.getChannels'), error);
      }
    };
    fetchMessages();
  }, [user, dispatch, t]);

  return (
    <div className="col p-0 h-100 d-flex flex-column">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${activeChannelName}`}
          </b>
        </p>
        <span className="text-muted">
          {t('mainPage.messagesCount', { count: activeMessages.length })}
        </span>
      </div>
      <div
        ref={messagesBoxRef} // Привязываем реф к контейнеру
        id="messages-box"
        className="chat-messages overflow-auto px-5"
        style={{ minHeight: '63vh', maxHeight: '63vh' }}
      >
        {activeMessages.map(({ body, username, id }) => (
          <div
            key={id}
            className="text-break mb-2"
          >
            <b>{username}</b>
            {`: ${filter.clean(body)}`}
          </div>
        ))}
      </div>
      <ChatForm />
    </div>
  );
};

export default Messages;
