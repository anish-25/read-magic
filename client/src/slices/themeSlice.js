import { createSlice } from "@reduxjs/toolkit";
import { darkColors, lightColors } from "../lib/utils";

const theme = localStorage.getItem("theme") || import.meta.VITE_DEFAULT_THEME

const initialState = theme?.toLowerCase() === "light" ? {
    theme: "light",
    colors: lightColors
} : {
    theme: "dark",
    colors: darkColors
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
            state.colors = action.payload === "light" ? lightColors : darkColors
            localStorage.setItem("theme", action.payload)
        },
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light"
            state.colors = state.theme === "light" ? lightColors : darkColors
            localStorage.setItem("theme", state.theme)
        },
    }
})
export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer