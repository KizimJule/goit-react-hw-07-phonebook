import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContact } from './operations';

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [fetchContacts.pending]: state => {
      console.log(state);
      state.isLoading = true;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [addContacts.pending]: state => {
      state.isLoading = true;
    },
    [addContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },

  [deleteContact.pending]: state => {
    state.isLoading = true;
  },
  [deleteContact.fulfilled]: (state, action) => {
    console.log(action);
    // state.items = state.items.filter(contact => contact.id !== action.payload);
    state.isLoading = false;
    state.error = null;
    const idx = state.items.findIndex(
      contact => contact.id === action.payload.id
    );
    state.items.splice(idx, 1);
  },
  [deleteContact.rejected]: (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
  },
});

export const contactReducer = contactSlice.reducer;

// export default contactSlice.reducer;
