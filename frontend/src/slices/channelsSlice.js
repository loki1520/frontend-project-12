import { createSlice } from '@reduxjs/toolkit';

const initialState = { channelsList: [], currentChannelId: '1' };

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels(state, action) {
      state.channelsList = action.payload;
    },
    addChannel: (state, action) => {
      state.channelsList.push(action.payload);
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    removeChannel(state, action) {
      const { id } = action.payload;
      state.channelsList = state.channelsList.filter((message) => message.id !== id);
    },
    renameChannel(state, action) {
      const { id, newText } = action.payload;
      const currentMessage = state.channelsList.find((message) => message.id === id);
      if (currentMessage) {
        currentMessage.text = newText;
      }
    },
  },
});

export const {
  getChannels,
  addChannel,
  setCurrentChannel,
  removeChanel,
  renameChanel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
