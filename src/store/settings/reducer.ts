import { createSlice } from "@reduxjs/toolkit";
import { ISettingsState } from "./types";

const initialState: ISettingsState = {
  isFetching: false,
  errorMessage: null,
  successMessage: null,
};

const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    settingsSetIsFetching: (state, action: { payload: boolean }) => {
      state.isFetching = action.payload;
    },
    settingsSetSuccessMessage: (state, action: { payload: string | null }) => {
      state.successMessage = action.payload;
    },
    settingsSetErrorMessage: (state, action: { payload: string | null }) => {
      state.errorMessage = action.payload;
    },
    //Reset state to initial state (logout)
    settingsResetState: (state) => {
      for (let key in state) {
        //@ts-ignore
        state[key] = initialState[key];
      }
    },
  },
});

export const {
  settingsSetIsFetching,
  settingsSetSuccessMessage,
  settingsSetErrorMessage,
  settingsResetState,
} = settings.actions;

export default settings.reducer;
