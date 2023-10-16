import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false,
    user: {},
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.isAuthenticated = true
            state.user = action.payload.user
        },
        logout: (state) => {
            state.accessToken = ""
            state.refreshToken = ""
            state.isAuthenticated = false
            state.user = {}
        },
        updateUserDetails: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload
            }
        },
        updateCart: (state, action) => {
            state.user = {
                ...state.user,
                cart: action.payload
            }
        },
        updateCartProductDetails: (state, action) => {
            state.user = {
                ...state.user,
                cartProductDetails: action.payload
            }
        }
    }
})
export const { login, logout, updateCart, updateCartProductDetails,updateUserDetails } = authSlice.actions
export default authSlice.reducer