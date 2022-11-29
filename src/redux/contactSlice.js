import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { fetchContacts } from '../redux/operations';

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    items: [],
    isLoading: false,
    error: null,
  },
  // Добавляем обработку внешних экшенов
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  // reducers: {
  //   addContact(state, action) {
  //     state.contacts.push(action.payload);
  //   },
  //   removeContact(state, action) {
  //     state.contacts = state.contacts.filter(
  //       contact => contact.id !== action.payload.id
  //     );
  //   },
  // },
});

// сохраняем список контактов в local Storage
const persistConfig = {
  key: 'root',
  storage,
};
export const persistSubmitReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);
//

export const { addContact, removeContact } = contactSlice.actions;
export const tasksReducer = contactSlice.reducer;
export default contactSlice.reducer;
