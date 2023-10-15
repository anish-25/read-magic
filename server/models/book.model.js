const mongoose = require('mongoose')

const min = 200;
const max = 3000;


const bookSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    authors: { type: String, required: true },
    average_rating: { type: Number, required: true },
    isbn: { type: String, required: true },
    isbn13: { type: Number, required: true },
    language_code: { type: String, required: true },
    num_pages: { type: Number, required: true },
    ratings_count: { type: Number, required: true },
    text_reviews_count: { type: Number, required: true },
    publication_date: { type: Date, required: true },
    publisher: { type: String, required: true },
    isAStockBook: { type: Boolean, default: true },
    price: { type: Number, required: true, default: Math.floor(Math.random() * (max - min + 1)) + min },
},
    { timestamps: true, collection: 'books' },
)

module.exports = mongoose.model('Book', bookSchema)