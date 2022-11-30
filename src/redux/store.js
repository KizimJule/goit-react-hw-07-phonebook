import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import filterReducer from './filterSlice';
import { contactReducer } from './contactSlice';
// import { persistSubmitReducer } from './contactSlice';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

export const store = configureStore({
  reducer: {
    // contacts: persistSubmitReducer,
    contacts: contactReducer,
    filter: filterReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);
