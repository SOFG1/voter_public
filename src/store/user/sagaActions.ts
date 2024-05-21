import { createAction } from "@reduxjs/toolkit";

export const userLogin = createAction<{username: string, password: string}>('user/login')
export const userGetUserInfo = createAction('user/getUserInfo')