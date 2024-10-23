import { useSelector } from 'react-redux';
import getModal from './index.js';

const ModalWindow = () => {
  const { isOpen, modalType } = useSelector((state) => state.modals);

  if (!isOpen) return null;

  const ActiveModal = getModal(modalType);

  return <ActiveModal />;
};

export default ModalWindow;
