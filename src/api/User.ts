import { axiosInstance } from "."

export const User = {
    login: async (params: {username: string, password: string}) => {
        return await axiosInstance.post('login/', params)
    },
    getUserInfo: async (token: string) => {
        return await axiosInstance.get('user_info/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
    },
    getDescriptionText: async (token: string) => {
        return await axiosInstance.get('description/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
    }
}