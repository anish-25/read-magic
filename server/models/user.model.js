const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    username: {
        type: String,
        required: [true, 'Please add an username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    mobile: {
        type: String,
    },
    avatar: {
        type: String,
        default: "",
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        default: []
    }],
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema)