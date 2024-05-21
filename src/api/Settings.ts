import { axiosInstance } from "."
import { IChangePassword } from "../store/settings"

export const Settings = {
    changePassword: async (token: string, params: IChangePassword) => {
        return await axiosInstance.post("change_password/", params, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
    }
}