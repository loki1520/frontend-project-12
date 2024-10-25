import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
import socket from '../socket.js';
import { closeModal } from '../slices/modalsSlice.js';
import { removeChannel, setCurrentChannel } from '../slices/channelsSlice.js';
import { removeMessage } from '../slices/messagesSlice.js';

const RemoveChannel = () => {
  const { user: { token } } = useAuth();
  const dispatch = useDispatch();

  const removingChannelId = useSelector((state) => state.modals.removingChannelId);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  useEffect(() => {
    const handleRemoveChannel = (payload) => {
      console.log('payload 🍀===>>', payload);

      // Проверка на наличие данных
      if (payload) {
        const { id } = payload; // Извлечение ID канала

        // Удаляем канал
        dispatch(removeChannel(payload));

        // Переключаем текущий канал
        if (currentChannelId === id) {
          dispatch(setCurrentChannel(1)); // Если удаляемый канал текущий, переключаем на первый
        } else {
          dispatch(setCurrentChannel(id)); // Иначе переключаем на удаляемый
        }

        // Удаляем сообщения связанного канала
        dispatch(removeMessage(payload));
      } else {
        console.error('Payload or payload.data is undefined:', payload);
      }
    };

    socket.on('removeChannel', handleRemoveChannel); // Подписка на событие

    return () => {
      socket.off('removeChannel', handleRemoveChannel); // Отписка от события при размонтировании
    };
  }, [currentChannelId, dispatch]);

  const handledRemoveChannel = async () => {
    try {
      await axios.delete(routes.removeChannelsPath(removingChannelId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // => { id: '3'}
      dispatch(closeModal());
    } catch (error) {
      console.error('Ошибка при удалении канала', error);
    }
  };

  return (
    <Modal show centered onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <button
            onClick={() => dispatch(closeModal())}
            type="button"
            className="me-2 btn btn-secondary"
          >
            Отменить
          </button>
          <button
            onClick={handledRemoveChannel}
            type="button"
            className="btn btn-danger"
          >
            Удалить
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default RemoveChannel;
