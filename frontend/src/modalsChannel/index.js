import AddChannel from './Add.jsx';
import RemoveChannel from './Remove.jsx';
import RenameChannel from './Rename.jsx';

const modals = {
  adding: AddChannel,
  renaming: RenameChannel,
  removing: RemoveChannel,
};

const getModal = (modalType) => modals[modalType]; // return modal component

export default getModal;
