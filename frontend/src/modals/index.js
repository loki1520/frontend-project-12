import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  adding: AddChannel,
  renaming: RenameChannel,
  removing: RemoveChannel,
};

const getModal = (modalType) => modals[modalType]; // return modal component

export default getModal;
