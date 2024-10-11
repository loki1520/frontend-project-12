import { createSlice } from '@reduxjs/toolkit';

const initialState = { messagesList: [], _ids: [], _currentMessageId: null };

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
    removeMessage(state, action) {
      const { id } = action.payload;
      state.messagesList = state.messagesList.filter((message) => message.id !== id);
    },
    renameMessage(state, action) {
      const { id, newText } = action.payload;
      const currentMessage = state.messagesList.find((message) => message.id === id);
      if (currentMessage) {
        currentMessage.text = newText;
      }
    },
  },
});

export const {
  getMessages,
  addMessage,
  removeMessage,
  renameMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
