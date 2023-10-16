const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const Book = require('../models/book.model')
const axios = require('axios')
require('dotenv').config()

const googleBooksApi = process.env.GOOGLE_BOOKS_API

const addorRemoveFromCart = asyncHandler(async (req, res) => {
    const { bookId } = req.query
    const user = await User.findById(req.user.id)
    const book = await Book.findById(bookId)
    console.log(req.user)
    if (!book) {
        return res.status(400).json({ message: 'Book not found' })
    }
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    if (user && book) {
        console.log(user.cart)
        let bookExistsInCart = user.cart.find(book => book?.product?.toString() === bookId)
        if (!bookExistsInCart) {
            user.cart.push({ product: book?._id })
        }
        else {
            user.cart = user.cart.filter(item => item?.product?.toString() !== bookId)
        }
        let updatedUser = await user.save()
        return res.status(200).json({ cart: updatedUser.cart })
    }
})

const updateQuantity = asyncHandler(async (req, res) => {
    let { bookId, quantity } = req.query
    const user = await User.findById(req.user.id)
    const book = await Book.findById(bookId)
    if (!book) {
        return res.status(400).json({ message: 'Book not found' })
    }
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    if (!quantity) {
        return res.status(400).json({ message: 'Quantity not found' })
    }
    if (user && book) {
        quantity = parseInt(quantity)
        let bookExistsInCart = user.cart.find(book => book?.product?.toString() === bookId)
        if (!bookExistsInCart) {
            return res.status(400).json({ message: 'Book not found in cart' })
        }
        if (quantity < 1 || quantity > 10 || typeof quantity !== 'number') {
            return res.status(400).json({ message: 'Invalid quantity' })
        }
        user.cart.find(book => book?.product?.toString() === bookId).quantity = quantity
        let updatedUser = await user.save()
        return res.status(200).json({ cart: updatedUser.cart })
    }
})

module.exports = { addorRemoveFromCart, updateQuantity }