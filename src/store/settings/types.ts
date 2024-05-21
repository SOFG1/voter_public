export interface IChangePassword {
    old_password: string
    new_password: string
    reenter_password: string
}

export interface ISettingsState {
    errorMessage: string  | null
    successMessage: string | null
    isFetching: boolean
}