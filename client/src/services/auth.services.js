import { useDispatch } from "react-redux"
import { publicEndpoints } from "../axios/endpoints"
import axios from "../axios/gateWay"
import { login } from "../slices/authSlice"
import { hideLoader, showLoader } from "../slices/loaderSlice"

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

export const handleRefresh = (token,dispatch,navigate) => {
   return axios.post(publicEndpoints.refresh, { refreshToken: token }).then(res => {
      if(res?.data?.accessToken) {
         let data = {
            accessToken: res?.data?.accessToken,
            refreshToken: res?.data?.refreshToken,
            user: res?.data,
            isAuthenticated: true
         }
         localStorage.setItem('refresh', res?.data?.refreshToken?.token)
         dispatch(login(data))
      }
   }).catch(err => {
      navigate('/sign-in')
   }).finally(() => {
      dispatch(hideLoader('pageLoader'))
   })
}