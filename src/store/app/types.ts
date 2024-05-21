export type AlertType = {
    success: boolean
    text: string
}

export interface IAppState {
    alert: AlertType | null
}