import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageLoader: true,
    cartButton: false,
    signInButton: false,
    signUpButton: false,
    proceedToCheckoutButton:false,
}

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        showLoader: (state, action) => {
            state[action.payload] = true
        },
        hideLoader: (state,action) => {
            state[action.payload] = false
        },
    }
})

export const { showLoader, hideLoader } = loaderSlice.actions

export default loaderSlice.reducer