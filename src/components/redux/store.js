import { configureStore } from '@reduxjs/toolkit';
import { contactsStateReducer } from './contactsStateSlice';

export const store = configureStore({
  reducer: {
    contactsState: contactsStateReducer,
  },
});
