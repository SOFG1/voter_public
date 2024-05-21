import { createSlice } from "@reduxjs/toolkit";
import { IUserInfo, IUserState } from "./types";

const initialState: IUserState = {
  token: null,
  isAgreed: false,
  error: null,
  isFetching: false,
  skipped_contacts_form: false,
  userInfo: {
    to_call: 0,
    called: 0,
    good: 0,
    bad: 0,
    unknown: 0,
    is_contacts_uploaded: false,
    is_sync_contacts: undefined,
    mode: "status_update"
  },
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSetAgreed: (state, action: { payload: boolean }) => {
      state.isAgreed = action.payload;
    },
    userSetError: (state, action: { payload: string | null }) => {
      state.error = action.payload;
    },
    userSetIsFetching: (state, action: { payload: boolean }) => {
      state.isFetching = action.payload;
    },
    userSetToken: (state, action: { payload: string | null }) => {
      state.token = action.payload;
    },
    userSetUserInfo: (state, action: { payload: IUserInfo }) => {
      state.userInfo = action.payload;
    },
    userSetSkipContacts: (state, action: { payload: boolean }) => {
      state.skipped_contacts_form = action.payload;
    },
    //Reset state to initial state (logout)
    userResetState: (state) => {
      for (let key in state) {
        //@ts-ignore
        state[key] = initialState[key]
      }
    }
  },
});

export const {
  userSetAgreed,
  userSetError,
  userSetIsFetching,
  userSetToken,
  userSetUserInfo,
  userSetSkipContacts,
  userResetState
} = user.actions;

export default user.reducer;
