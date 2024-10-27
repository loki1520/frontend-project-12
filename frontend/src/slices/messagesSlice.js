import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const initialState = { messagesList: [], _currentMessageId: null };

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages(state, action) {
      state.messagesList = action.payload;
    },
    addMessage: (state, action) => {
      state.messagesList.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const { id } = action.payload;
        state.messagesList = state.messagesList.filter((message) => message.channelId !== id);
      });
  },
});

export const {
  getMessages,
  addMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
