import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
import { closeModal } from '../slices/modalsSlice.js';

const RemoveChannel = () => {
  const { t } = useTranslation();

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
      toast.success(t('toastify.removedChannel'));
      dispatch(closeModal());
    } catch (error) {
      console.error('Ошибка при удалении канала', error);
    }
  };

  return (
    <Modal show centered onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('mainPage.removeChannelTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('mainPage.confirmRemove')}</p>
        <div className="d-flex justify-content-end">
          <button
            onClick={() => dispatch(closeModal())}
            type="button"
            className="me-2 btn btn-secondary"
          >
            {t('mainPage.cancel')}
          </button>
          <button
            onClick={handledRemoveChannel}
            type="button"
            className="btn btn-danger"
          >
            {t('mainPage.remove')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default RemoveChannel;
