import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../slices/channelsSlice.js';
import { openModal } from '../slices/modalsSlice.js';

const Channel = ({ name, id, removable }) => {
  const dispatch = useDispatch();

  const { currentChannelId } = useSelector((state) => state.channels);

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
            <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renaming', id }))}>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </li>
  );
};

export default Channel;
