import axios from "../axios/private"
import { updateCart, updateCartProductDetails } from "../slices/authSlice"
import { getAllBooks } from './book.services'
export const addorRemoveFromCart = (bookId) => {
    return axios.post('/cart' + `?bookId=${bookId}`)
}

export const fetchCartProductDetails = (bookIds, dispatch, setLoader) => {
    if (bookIds.length === 0) return []
    let bookIdsSeparatedbyCommas = bookIds.join(',')
    return getAllBooks(`?ids=${bookIdsSeparatedbyCommas}`).then(res => {
        dispatch(updateCartProductDetails(res.data))
    }).catch(err => {
        console.log(err)
        dispatch(updateCartProductDetails([]))
    }).finally(() => {
        setLoader(false)
    })
}

export const updateProductQuantity = (bookId, quantity, dispatch, setLoader) => {
    setLoader(true)
    return axios.put('/cart' + `?bookId=${bookId}&quantity=${quantity}`).then(res => {
        dispatch(updateCart(res.data?.cart))
    }).catch(err => {
        console.log(err)
    }).finally(() => {
        setLoader(false)
    })
}