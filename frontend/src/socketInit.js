import { toast } from 'react-toastify';
import socket from './socket.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';

const initSocket = (dispatch, t) => {
  const handleConnect = () => {
    // console.log('WebSocket connected');
  };

  const onNewMessage = (payload) => {
    // console.log('Socket: новое сообщение', payload);
    dispatch(addMessage(payload));
  };

  const onAddChannel = (payload) => {
    // console.log('Socket: создание канала', payload);
    dispatch(addChannel(payload));
  };

  const onRemoveChannel = (payload) => {
    // console.log('Socket: удаление канала', payload);
    dispatch(removeChannel(payload));
  };

  const onRenameChannel = (payload) => {
    // console.log('Socket: переименованиe канала', payload);
    dispatch(renameChannel(payload));
  };

  const handleConnectError = () => {
    toast.error(t('errors.connect_error'));
    console.error(t('errors.connect_error'));
  };

  const handleDisconnect = () => {
    toast.error(t('errors.disconnect'));
    console.error(t('errors.disconnect'));
  };

  const handleOffline = () => {
    toast.error(t('errors.offline'));
    console.error(t('errors.offline'));
  };

  const handleOnline = () => {
    toast.success(t('errors.online'));
    console.log(t('errors.online'));
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
