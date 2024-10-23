import AddChannels from './AddChannels.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modals = {
  adding: AddChannels,
  renaming: RenameChannel,
  removing: RemoveChannel,
};

const getModal = (modalType) => modals[modalType]; // return modal component

export default getModal;
