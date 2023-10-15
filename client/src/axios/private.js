import axios from 'axios'
import store from '../store/store'
const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 1000
})
instance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken?.token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, (error) => {
        return Promise.reject(error);
    }
)
export default instance