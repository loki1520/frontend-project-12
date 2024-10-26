import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import routes from '../routes';
import useAuth from '../hooks/useAuth.js';
import { openModal } from '../slices/modalsSlice.js';
import { getChannels, setCurrentChannel } from '../slices/channelsSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { channelsList, currentChannelId } = useSelector((state) => state.channels);

  useEffect(() => {
    if (!user) return;
    const { token } = user;

    const fetchChannels = async () => {
      try {
        const responseChannels = await axios.get(routes.channelsPath(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        // [{ id: '1', name: 'general', removable: false }, ...]
        dispatch(getChannels(responseChannels.data));
      } catch (error) {
        console.error('Ошибка при получении каналов:', error);
      }
    };
    fetchChannels();
  }, [user, dispatch]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light d-flex flex-column h-100">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          onClick={() => dispatch(openModal({ type: 'adding' }))}
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
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
        style={{ maxHeight: '74vh', minHeight: '74vh' }}
      >
        {channelsList.map(({ name, id, removable }) => {
          // here is norm?!!!!! will check...
          const originalButton = () => (
            <button
              onClick={() => dispatch(setCurrentChannel(id))}
              type="button"
              className={`w-100 rounded-0 text-start text-truncate btn ${id === currentChannelId ? 'btn-secondary' : ''}`}
            >
              <span className="me-1">#</span>
              {name}
            </button>
          );
          return (
            <li
              key={id}
              className="nav-item w-100"
            >
              {!removable ? (
                originalButton()
              ) : (
                <Dropdown className="d-flex" as={ButtonGroup}>
                  { originalButton() }
                  <Dropdown.Toggle
                    variant={id === currentChannelId ? 'secondary' : 'light'}
                    className="flex-grow-0"
                    split
                    id="dropdown-split-basic"
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => dispatch(openModal({ type: 'removing', id }))}>Удалить</Dropdown.Item>
                    <Dropdown.Item>Переименовать</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
