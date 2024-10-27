import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: false, modalType: '', removingChannelId: '' };

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
        state.clickedChannelId = action.payload.id;
      }
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.clickedChannelId = null;
    },
  },
});

export const {
  openModal,
  closeModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
