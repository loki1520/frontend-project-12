import { createSlice } from '@reduxjs/toolkit';

const initialState = { channelsList: [], _currentChannelId: null };

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
  removeChanel,
  renameChanel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
