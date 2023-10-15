import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../slices/booksSlice";
import authReducer from "../slices/authSlice";
import loaderReducer from "../slices/loaderSlice";
const store = configureStore({
    reducer: {
        books: booksReducer,
        auth: authReducer,
        loader: loaderReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
})

export default store