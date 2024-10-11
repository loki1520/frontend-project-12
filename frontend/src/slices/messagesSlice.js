import { createSlice } from '@reduxjs/toolkit';

const initialState = { messages: [], _ids: [], _currentMessageId: null };

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessage(state, action) {
      const { id } = action.payload;


      state.messages = state.messages.filter((message) => message.id !== id);
    },
    renameMessage(state, action) {
      const { id, newText } = action.payload;
      const currentMessage = state.messages.find((message) => message.id === id);
      if (currentMessage) {
        currentMessage.text = newText;
      }
    },
  },
});

export const {
  addMessages,
  addMessage,
  removeMessage,
  renameMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
