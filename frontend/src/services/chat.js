import axios from 'axios';
import routes from '../routes';
import {
  getChannels,
} from '../slices/channelsSlice.js';
import {
  getMessages,
} from '../slices/messagesSlice.js';

export const fetchChannels = async (token, dispatch) => {
  try {
    const responseChannels = await axios.get(routes.channelsPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getChannels(responseChannels.data));
  } catch (error) {
    console.error('Ошибка при получении каналов:', error);
  }
};

export const fetchMessages = async (token, dispatch) => {
  try {
    const responseMessages = await axios.get(routes.messagesPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getMessages(responseMessages.data));
  } catch (error) {
    console.error('Ошибка при получении сообщений:', error);
  }
};
