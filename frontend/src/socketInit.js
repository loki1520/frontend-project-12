import socket from './socket.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';

const initSocket = (dispatch) => {
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

  const handleError = (error) => {
    console.error('Socket error:', error);
  };

  const handleDisconnect = (reason) => {
    console.error('Socket disconnected:', reason);
  };

  // Устанавливаем соединение и подписываемся на события
  socket.on('connect', () => {
    console.log('WebSocket connected');
  });

  socket.on('newMessage', onNewMessage);
  socket.on('newChannel', onAddChannel);
  socket.on('removeChannel', onRemoveChannel);
  socket.on('renameChannel', onRenameChannel);
  socket.on('disconnect', handleDisconnect);
  socket.on('error', handleError);

  // Возвращаем функцию для удаления всех подписок
  return () => {
    socket.off('newMessage', onNewMessage);
    socket.off('newChannel', onAddChannel);
    socket.off('removeChannel', onRemoveChannel);
    socket.off('renameChannel', onRenameChannel);
    socket.off('disconnect', handleDisconnect);
    socket.off('error', handleError);
    socket.off('connect');
  };
};

export default initSocket;
