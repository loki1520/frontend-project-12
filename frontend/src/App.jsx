import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import socket from './socket.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';
import LoginPage from './pages/LoginPage.jsx';
import MainPage from './pages/MainPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AuthProvider from './contexts/auth-context.jsx';
import useAuth from './hooks/useAuth.js';

const PrivateRoute = ({ children }) => {
  const { location } = useAuth();
  const isAuthorized = localStorage.getItem('userData');

  return (
    isAuthorized ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    function onNewMessage(payload) {
      console.log('Socket: новое сообщение', payload);
      // payload => {body: {…}, channelId: '29', username: 'loki', removable: true, id: '34'}
      dispatch(addMessage(payload));
    }
    function onAddChannel(payload) {
      console.log('Socket: создание канала', payload);
      // payload => {name: 'new', removable: true, id: '35'}
      dispatch(addChannel(payload));
    }
    function onRemoveChannel(payload) {
      console.log('Socket: удаление канала', payload);
      // payload => {id: '35'}
      dispatch(removeChannel(payload));
    }
    function onRenameChannel(payload) {
      console.log('Socket: переименованиe канала', payload);
      // renameChannel => { id: 7, name: "new name channel", removable: true }
      dispatch(renameChannel(payload));
    }
    const handleError = (error) => {
      console.error('Socket error:', error);
    };
    const handleDisconnect = (reason) => {
      console.error('Socket disconnected:', reason);
    };
    // Sucsess connection
    socket.on('connect', () => {
      console.log('WebSocket connected');
    });
    // subscribe new message
    socket.on('newMessage', onNewMessage);
    // subscribe new channel
    socket.on('newChannel', onAddChannel);
    // subscribe remove channel
    socket.on('removeChannel', onRemoveChannel);
    // subscribe rename channel
    socket.on('renameChannel', onRenameChannel);
    // Handle errors and disconnects
    socket.on('disconnect', handleDisconnect);
    socket.on('error', handleError);

    return () => {
      socket.off('newMessage', onNewMessage);
      socket.off('newChannel', onAddChannel);
      socket.off('removeChannel', onRemoveChannel);
      socket.off('renameChannel', onRenameChannel);
      socket.off('disconnect', handleDisconnect);
      socket.off('error', handleError);
      socket.off('connect');
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
