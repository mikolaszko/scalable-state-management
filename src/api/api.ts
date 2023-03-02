import axios, { AxiosHeaders } from "axios"
import { apiUrl } from "./base"

export const api = axios.create({
	baseURL: apiUrl,
	headers: {
		"Content-Type": "application/json",
	},
})

//@ts-ignore
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token")
	return token
		? {
				...config,
				headers: { ...config.headers, Authorization: `Token ${token}` },
		  }
		: config
}, Promise.reject)

export default api
