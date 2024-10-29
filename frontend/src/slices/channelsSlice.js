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
      state.channelsList = state.channelsList.filter((el) => el.id !== id);

      if (state.currentChannelId === id) {
        state.currentChannelId = '1';
      }
    },
    renameChannel(state, action) {
      const { id, name } = action.payload;
      const currentChannel = state.channelsList.find((el) => el.id === id);
      if (currentChannel) {
        currentChannel.name = name;
      }
    },
  },
});

export const {
  getChannels,
  addChannel,
  setCurrentChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
