import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
    name: "books",
    initialState: {
        books: undefined,
        popularBooks: undefined,
        newlyPublished: undefined
    },
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        setPopularBooks: (state, action) => {
            state.popularBooks = action.payload;
        },
        setNewlyPublished: (state, action) => {
            state.newlyPublished = action.payload;
        }
    },
})

export const { setBooks, setPopularBooks, setNewlyPublished } = booksSlice.actions
export default booksSlice.reducer