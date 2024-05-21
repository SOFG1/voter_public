import { spawn } from "redux-saga/effects";
import { contactsWatcher } from "./contacts/saga";
import { userWatcher } from "./user/saga";
import { settingsWatcher } from "./settings/saga";


export function* rootSaga() {
    yield spawn(userWatcher)
    yield spawn(contactsWatcher)
    yield spawn(settingsWatcher)
}