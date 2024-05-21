import { call, put, select, takeLatest } from 'redux-saga/effects'
import { handle } from '../../api'
import { User } from '../../api/User'
import { userSelector } from './hooks'
import { userSetAgreed, userSetError, userSetToken, userSetUserInfo } from './reducer'
import { userLogin, userGetUserInfo } from './sagaActions'
import { IUserInfo } from './types'

export function* userWatcher() {
    yield takeLatest(userLogin, login)
    yield takeLatest(userGetUserInfo, getInfo)
}


function* login({payload}: {payload: {username: string, password: string}}): any {
    const [dataRes, dataErr]: [{token: string} | undefined, any] = yield call(handle,User.login(payload))
    if (dataRes) {
        yield put(userSetError(null))
        yield put(userSetToken(dataRes.token))
        yield put(userGetUserInfo())
    }
    if (dataErr) {
        yield put(userSetError( dataErr.non_field_errors ? dataErr.non_field_errors[0] : "Error occured"))
    }
}

function* getInfo(): any {
    const {token} = yield select(userSelector)
    if (token) {
        const [dataRes, dataErr]: [IUserInfo | undefined, any] = yield call(handle, User.getUserInfo(token))
        if (dataRes) {
            if(dataRes.is_contacts_uploaded) yield put (userSetAgreed(true))
            yield put(userSetUserInfo(dataRes))
        }
        if (dataErr) {
            console.log(dataErr)
        }
    }
}