import { call, put, select, takeLeading } from "redux-saga/effects";
import { handle } from "../../api";
import { Settings } from "../../api/Settings";
import { userSelector } from "../user/hooks";
import { settingsSetErrorMessage, settingsSetIsFetching, settingsSetSuccessMessage } from "./reducer";
import { settingsChangePassword } from "./sagaActions";
import { IChangePassword } from "./types";

export function* settingsWatcher() {
    yield takeLeading(settingsChangePassword, changePassword)
}

function* changePassword({payload}: {payload: IChangePassword}): any {
    const {token} = yield select(userSelector)
    if (token) {
        yield put(settingsSetIsFetching(true))
        yield put(settingsSetErrorMessage(null))
        yield put(settingsSetSuccessMessage(null))
        const [dataRes, dataErr] = yield call(handle, Settings.changePassword(token, payload))
        yield put(settingsSetIsFetching(false))
        if (!dataErr) {
        yield put(settingsSetSuccessMessage("Password has been changed successfully"))
        }
        if (dataErr) {
            console.log(dataErr)
            yield put(settingsSetErrorMessage(dataErr.error))
        }
    }
}