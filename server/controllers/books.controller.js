const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const Book = require('../models/book.model')
const axios = require('axios')
require('dotenv').config()

const googleBooksApi = process.env.GOOGLE_BOOKS_API
const getAllBooks = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { authors, title, publisher, ids } = req.query;
    const searchCriteria = {};

    if (authors) {
      searchCriteria.authors = new RegExp(authors, 'i');
    }
    if (title) {
      searchCriteria.title = new RegExp(title, 'i');
    }
    if (publisher) {
      searchCriteria.publisher = new RegExp(publisher, 'i');
    }
    if (ids) {
      const bookIds = ids.split(',').map((id) => id.trim());
      searchCriteria._id = { $in: bookIds };
    }
    const skip = (page - 1) * limit;
    const books = await Book.find(searchCriteria)
      .skip(skip)
      .limit(limit)

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error });
  }
})

const getPopularBooks = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const books = await Book.find().sort({ ratings_count: -1 }).limit(10).skip(skip);
    let booksData = await Promise.all(
      books.map(async book => {
        let response = {}
        try {
          response = await axios.get(`${googleBooksApi}/?q=isbn:${book.isbn}`);
        } catch (err) {
          response = {}
        }
        let description = "Description not available"
        if (response?.data?.items && response.data?.items[0]?.volumeInfo?.description) {
          description = response.data.items[0]?.volumeInfo?.description
        }
        return {
          ...book?._doc,
          description
        }
      })
    )
    res.status(200).json(booksData);
  } catch (error) {
    res.status(500).json({ error });
  }
})

const createBook = asyncHandler(async (req, res) => {
  try {
    const book = await Book.create({ ...req.body, user: req.user._id });
    res.status(201).json(book);
  }
  catch (error) {
    res.status(500).json({ error: error });
  }
})

const getBookDetails = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    let response = {}
    console.log(`${googleBooksApi}/?q=isbn:${book.isbn}`)
    try {
      response = await axios.get(`${googleBooksApi}/?q=isbn:${book.isbn}`);
    } catch (err) {
      response = {}
    }
    const bookData = response?.data?.items[0] || { volumeInfo: {} };
    let description = "Description not available"
    if (bookData?.volumeInfo?.description) {
      description = bookData?.volumeInfo?.description
    }
    res.status(200).json({ ...bookData?.volumeInfo, ...book?._doc, description });
  } catch (error) {
    res.status(500).json(error);
  }
})

const searchBooks = async (req, res) => {
  try {
    const searchTerm = req.query.term
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    if (!searchTerm) {
      return res.status(400).json({ message: 'Search term is required' });
    }
    const searchResults = await Book.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { authors: { $regex: searchTerm, $options: 'i' } },
      ],
    })
      .skip(skip)
      .limit(perPage);
    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getAllBooks, createBook, getBookDetails, getPopularBooks, searchBooks }