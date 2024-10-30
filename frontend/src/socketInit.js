import { toast } from 'react-toastify';
import socket from './socket.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';

const initSocket = (dispatch) => {
  const handleConnect = () => {
    console.log('WebSocket connected');
  };

  const onNewMessage = (payload) => {
    console.log('Socket: новое сообщение', payload);
    dispatch(addMessage(payload));
  };

  const onAddChannel = (payload) => {
    console.log('Socket: создание канала', payload);
    dispatch(addChannel(payload));
  };

  const onRemoveChannel = (payload) => {
    console.log('Socket: удаление канала', payload);
    dispatch(removeChannel(payload));
  };

  const onRenameChannel = (payload) => {
    console.log('Socket: переименованиe канала', payload);
    dispatch(renameChannel(payload));
  };

  const handleConnectError = () => {
    toast.error('Ошибка подключения: не удается установить соединение с сервером.');
    console.error('Ошибка подключения: не удается установить соединение с сервером.');
  };

  const handleDisconnect = () => {
    toast.error('Соединение было прервано.');
    console.error('Соединение было прервано.');
  };

  const handleOffline = () => {
    toast.error('Интернет-соединение потеряно.');
    console.error('Интернет-соединение потеряно.');
  };

  const handleOnline = () => {
    toast.success('Интернет-соединение восстановлено.');
    console.log('Интернет-соединение восстановлено.');
  };

  socket.on('connect', handleConnect);
  socket.on('newMessage', onNewMessage);
  socket.on('newChannel', onAddChannel);
  socket.on('removeChannel', onRemoveChannel);
  socket.on('renameChannel', onRenameChannel);
  socket.on('connect_error', handleConnectError);
  socket.on('disconnect', handleDisconnect);
  window.addEventListener('offline', handleOffline);
  window.addEventListener('online', handleOnline);

  return () => {
    socket.off('connect', handleConnect);
    socket.off('newMessage', onNewMessage);
    socket.off('newChannel', onAddChannel);
    socket.off('removeChannel', onRemoveChannel);
    socket.off('renameChannel', onRenameChannel);
    socket.off('connect_error', handleConnectError);
    socket.off('disconnect', handleDisconnect);
    window.removeEventListener('offline', handleOffline);
    window.removeEventListener('online', handleOnline);
  };
};

export default initSocket;
