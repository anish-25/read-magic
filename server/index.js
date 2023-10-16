const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const path = require('path')
const csvToJson = require('csvtojson')
const cors = require('cors')
const multer = require('multer')

const { verifyToken } = require('./middlewares/verifyToken')
const Book = require('./models/book.model')

require('dotenv').config()
const port = process.env.PORT
const app = express()

mongoose.connect(process.env.MONGO_URI, () => console.log("Connected"))

app.use(cors({
    origin: process.env.NODE_ENV === 'development' ? '*' : process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
app.use(cookieParser())


const storage = multer.memoryStorage();

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

app.post('/api/upload', [verifyToken, upload.single("file")], (req, res) => {
    try {
        const file = req.file.buffer;
        if (!file) {
            return res.status(400).json({ error: 'No file received' });
        }
        if (!req.user.isAdmin) return res.status(401).json({ message: "Unauthorized" })
        csvToJson().fromString(file.toString()).then(async (jsonObj) => {
            let filtered = jsonObj.filter(post => post?.authors && post?.isbn)
            for (const bookData of filtered) {
                const newBook = new Book({ ...bookData, user: req.user.id });
                try {
                    await newBook.save();
                } catch (error) {
                    console.error('Error saving book:', error);
                }
            }
            return res.status(200).json({ message: 'Books uploaded successfully' });
        })
    } catch (err) {
        return res.status(500).json(err)
    }
})

app.use('/images', express.static(path.join(__dirname, 'public')))

app.use('/api', require('./routes/routes'))

app.listen(port, console.log(`App running on ${port}`))