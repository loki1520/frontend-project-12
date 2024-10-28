// import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
// import socket from '../socket.js';
import { closeModal } from '../slices/modalsSlice.js';
// import { removeChannel } from '../slices/channelsSlice.js';

const RemoveChannel = () => {
  const { user: { token } } = useAuth();
  const dispatch = useDispatch();

  const clickedChannelId = useSelector((state) => state.modals.clickedChannelId);

  // useEffect(() => {
  //   socket.on('removeChannel', (payload) => {
  //     // payload => { id: 6 }
  //     dispatch(removeChannel(payload));
  //   });
  //   return () => {
  //     socket.off('removeChannel');
  //   };
  // }, [dispatch]);

  const handledRemoveChannel = async () => {
    try {
      await axios.delete(routes.removeChannelsPath(clickedChannelId), {
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
