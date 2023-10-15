import axios from '../axios/gateWay'
export const getBookDetails = (id) => {
    return axios.get(`/books/${id}`)
}

export const getPopularBooks = (query="") => {
    return axios.get(`/books/popular`+query)
}

export const searchForABook = (query,page="1") => {
    return axios.get(`/books/search?term=${query}&page=${page}`)
}

export const getAllBooks = (query="") => {
    return axios.get(`/books`+query)
}