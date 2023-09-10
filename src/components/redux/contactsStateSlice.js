import { createSlice } from '@reduxjs/toolkit';
import { createContact, fetchContacts, deleteContact } from './operations';

const initialContactsState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const rejectFunc = (state, action) => {
  return {
    contacts: {
      items: state.contacts.items,
      isLoading: false,
      error: action.payload,
    },
    filter: '',
  };
};
const pendingFunc = state => {
  return {
    contacts: {
      items: state.contacts.items,
      isLoading: true,
      error: null,
    },
    filter: '',
  };
};

const contactsStateSlice = createSlice({
  name: 'contactsState',
  initialState: initialContactsState,
  reducers: {
    filteringContacts: (state, action) => {
      return {
        contacts: {
          items: [...state.contacts.items],
          isLoading: false,
          error: null,
        },
        filter: action.payload,
      };
    },
  },

  extraReducers: builder => {
    // fetch

    builder.addCase(fetchContacts.pending, pendingFunc);
    builder.addCase(fetchContacts.fulfilled, (_, action) => {
      return {
        contacts: {
          items: [...action.payload],
          isLoading: false,
          error: null,
        },
        filter: '',
      };
    });
    builder.addCase(fetchContacts.rejected, rejectFunc);

    // create

    builder.addCase(createContact.pending, pendingFunc);
    builder.addCase(createContact.fulfilled, (state, action) => {
      return {
        contacts: {
          items: [...state.contacts.items, action.payload],
          isLoading: false,
          error: null,
        },
        filter: '',
      };
    });
    builder.addCase(createContact.rejected, rejectFunc);

    // delete

    builder.addCase(deleteContact.pending, pendingFunc);
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      return {
        contacts: {
          items: [
            ...state.contacts.items.filter(el => el.id !== action.payload),
          ],
          isLoading: false,
          error: null,
        },
        filter: '',
      };
    });
    builder.addCase(deleteContact.rejected, rejectFunc);
  },
});

export const contactsStateReducer = contactsStateSlice.reducer;
export const { filteringContacts } = contactsStateSlice.actions;
