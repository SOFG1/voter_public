import { createSlice } from "@reduxjs/toolkit";
import { AlertType, IAppState } from "./types";

const initialState: IAppState = {
  alert: null,
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    appSetAlert: (state, action: { payload: AlertType | null }) => {
      state.alert = action.payload;
    },
  },
});

export const { appSetAlert } = app.actions;

export default app.reducer;
