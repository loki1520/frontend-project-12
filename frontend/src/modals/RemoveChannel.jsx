import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
import { closeModal } from '../slices/modalsSlice.js';

const RemoveChannel = () => {
  const { user: { token } } = useAuth();
  const dispatch = useDispatch();

  const pressedChannelId = useSelector((state) => state.modals.pressedChannelId);

  const handledRemoveChannel = async () => {
    try {
      await axios.delete(routes.removeChannelsPath(pressedChannelId), {
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
