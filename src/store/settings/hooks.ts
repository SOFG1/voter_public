import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { settingsChangePassword } from "./sagaActions";
import { IChangePassword } from "./types";

export const settingsSelector = (state: RootState) => state.settings

export const useSettingsState = () => useSelector(settingsSelector)

export const useSettingsActions = () => {
    const dispatch = useDispatch()
    const onChangePassword = (data: IChangePassword) => {
        dispatch(settingsChangePassword(data))
    }

    return {
        onChangePassword
    }
}