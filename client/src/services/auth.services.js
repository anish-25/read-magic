import { publicEndpoints } from "../axios/endpoints"
import axios from "../axios/gateWay"
import { login, logout, updateTokens } from "../slices/authSlice"
import { hideLoader } from "../slices/loaderSlice"
import store from "../store/store"


export const handleSignIn = (userInputs) => {
   return axios.post(publicEndpoints.signIn, userInputs)
}

export const checkUsername = (username) => {
   return axios.post(publicEndpoints.checkUsername, { username })
}

export const checkEmail = (email) => {
   return axios.post(publicEndpoints.checkEmail, { email })
}

export const handleSignUp = (userInputs) => {
   return axios.post(publicEndpoints.signUp, userInputs)
}

export const handleRefresh = async (token, dispatch, navigate) => {
   return axios.post(publicEndpoints.refresh, { refreshToken: token }).then(res => {
      if (res?.data?.accessToken) {
         let data = {
            accessToken: res?.data?.accessToken,
            refreshToken: res?.data?.refreshToken,
            user: res?.data,
            isAuthenticated: true
         }
         localStorage.setItem('refresh', res?.data?.refreshToken?.token)
         if (store.getState().auth.user?.id) {
            updateTokens({ accessToken: data?.accessToken, refreshToken: data?.refreshToken })
         }
         else {
            dispatch(login(data))
         }
         return res?.data?.accessToken?.token
      }
   }).catch(err => {
      console.log(err)
      if (navigate) {
         navigate('/sign-in')
      }
      else {
         dispatch(logout())
      }
   }).finally(() => {
      dispatch(hideLoader('pageLoader'))
   })
}