/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: false, modalType: '', pressedChannelId: '' };

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      if (action.payload.type) {
        state.modalType = action.payload.type;
      }
      if (action.payload.id) {
        state.pressedChannelId = action.payload.id;
      }
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.pressedChannelId = null;
    },
  },
});

export const {
  openModal,
  closeModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
