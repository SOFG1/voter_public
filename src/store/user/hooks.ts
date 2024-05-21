import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { contactsResetState } from "../contacts/reducer";
import { settingsResetState } from "../settings/reducer";
import { userResetState, userSetAgreed, userSetError, userSetSkipContacts } from "./reducer";
import { userGetUserInfo, userLogin } from "./sagaActions";

export const userSelector = (state: RootState) => state.user

export const useUserState = () => useSelector(userSelector)

export const useUserActions = () => {
    const dispatch = useDispatch()

    const onLogin = (params: {username: string, password: string}) => {
        dispatch(userLogin(params))
    }

    const onSetError = (err: null | string) => {
        dispatch(userSetError(err))
    }

    const onSetAgreed = (isAgreed: boolean) => dispatch(userSetAgreed(isAgreed))


    const onGetUserInfo = () => {
        dispatch(userGetUserInfo())
    }

    const onLogout = () => {
        dispatch(userResetState())
        dispatch(contactsResetState())
        dispatch(settingsResetState())
    }

    const onSetSkipForm = (skip: boolean) => {
        dispatch(userSetSkipContacts(skip))
    }

    return {
        onLogin,
        onSetError,
        onSetAgreed,
        onGetUserInfo,
        onLogout,
        onSetSkipForm
    }
}