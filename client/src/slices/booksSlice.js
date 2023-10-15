import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
    name: "books",
    initialState: {
        books: undefined,
        popularBooks: undefined,
    },
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        setPopularBooks: (state, action) => {
            state.popularBooks = action.payload;
        }
    },
})

export const { setBooks,setPopularBooks } = booksSlice.actions
export default booksSlice.reducer