import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/themeSlice";
import booksReducer from "../slices/booksSlice";
import authReducer from "../slices/authSlice";
import loaderReducer from "../slices/loaderSlice";
const store = configureStore({
    reducer: {
        theme: themeReducer,
        books: booksReducer,
        auth: authReducer,
        loader: loaderReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
})

export default store