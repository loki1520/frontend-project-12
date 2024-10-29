import ModalWindow from '../modals/ModalComponent.jsx';
import Header from '../components/Header.jsx';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';

const MainPage = () => (
  <div className="bg-light">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <Messages />
          </div>
        </div>
      </div>
    </div>
    <ModalWindow />
  </div>
);

export default MainPage;
