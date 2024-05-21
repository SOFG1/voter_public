import { createSlice } from "@reduxjs/toolkit";
import { IContactsState, ICurrentContact, IQuestionnaire, StateKeyType } from "./types";

const initialState: IContactsState = {
  error: null,
  isFetching: false,
  contacts: [],
  currentContact: null,
  previousId: null,
  added_valid_contacts: 0,
  total_valid_contacts: 0,
  questionnaire: null
};



const contacts = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    contactsSetError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
    contactsSetIsFetching: (state, action: { payload: boolean }) => {
      state.isFetching = action.payload;
    },
    contactsSetAddedValid: (state, action: { payload: number }) => {
      state.added_valid_contacts = action.payload;
    },
    contactsSetTotalValid: (state, action: { payload: number }) => {
      state.total_valid_contacts = action.payload;
    },
    contactsSetCurrent: (state, action: { payload: ICurrentContact | null }) => {
      console.log('changed current')
      state.previousId = state.currentContact ? state.currentContact.id : null
      state.currentContact = action.payload;
    },
    contactsSetQuestionnaire: (state, action: { payload: IQuestionnaire | null }) => {
      state.questionnaire = action.payload;
    },
    contactsClearWarnings: (state) => {
      if (state.currentContact) {
        state.currentContact.warning = [];
      }
    },
    contactsClearNameWarning: (state) => {
      if (state.currentContact) {
        state.currentContact.name_warning = undefined;
      }
    },
    //Reset state to initial state (logout)
    contactsResetState: (state) => {
      for (let key in state) {
        //@ts-ignore
        state[key] = initialState[key]
      }
    }
  },
});

export const {
  contactsSetError,
  contactsSetIsFetching,
  contactsSetAddedValid,
  contactsSetTotalValid,
  contactsSetCurrent,
  contactsClearWarnings,
  contactsResetState,
  contactsSetQuestionnaire,
  contactsClearNameWarning
} = contacts.actions;

export default contacts.reducer;
