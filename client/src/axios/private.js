import axios from 'axios'
import store from '../store/store'
import { handleRefresh } from '../services/auth.services'
const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
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
instance.interceptors.response.use(
    (response) => {
        return response
    }
    , async (error) => {
        const prevRequest = error?.config;
        if (error.response.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const accessToken = await handleRefresh(store.getState().auth.refreshToken?.token || localStorage.getItem('refresh'), store.dispatch)
            prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axios(prevRequest);
        }
        return Promise.reject(error);
    }
)
export default instance