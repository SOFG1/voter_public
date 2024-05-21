import { createAction } from "@reduxjs/toolkit";
import { IChangePassword } from "./types";

export const settingsChangePassword = createAction<IChangePassword>('settings/changePassword')