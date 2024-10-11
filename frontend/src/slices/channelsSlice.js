import { createSlice } from '@reduxjs/toolkit';

const initialState = { channels: [], _ids: [], _currentChannelId: null };

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels(state, action) {
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    removeChanel(state, action) {
      const { id } = action.payload;
      state.channels = state.channels.filter((message) => message.id !== id);
    },
    renameChanel(state, action) {
      const { id, newText } = action.payload;
      const currentMessage = state.channels.find((message) => message.id === id);
      if (currentMessage) {
        currentMessage.text = newText;
      }
    },
  },
});

export const {
  addChannels,
  addChannel,
  removeChanel,
  renameChanel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
