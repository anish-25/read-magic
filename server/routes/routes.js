const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

const { registerUser, loginUser, deleteUser, verifyOtp, refreshToken, updateUser, getUser, checkUsername, getBasicUserDetails, checkEmail, uploadProfilePic } = require('../controllers/user.controller')
const { verifyToken } = require('../middlewares/verifyToken')
const { getAllBooks, createBook, getBookDetails, getPopularBooks, searchBooks, getNewlyPublishedBooks } = require('../controllers/books.controller')
const { addorRemoveFromCart, updateQuantity } = require('../controllers/cart.controller')

//Test
router.get('/test', (req, res) => res.status(200).json({ message: 'All good.' }))

//-----------Auth-----------------//

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/username', checkUsername)
router.post('/email', checkEmail)
router.post('/verify-otp', verifyOtp)
router.post('/refresh-token', refreshToken)
router.get('/user-details/:id', getBasicUserDetails)


//-----------User-------------------------------//
router.route('/user/:id').get(verifyToken, getUser).delete(verifyToken, deleteUser).put(verifyToken, updateUser)
router.post('/profile-pic', [verifyToken, upload.single('file')], uploadProfilePic)


//-----------Books---------------------//

router.route('/books').get(getAllBooks).post(verifyToken, createBook)
router.route('/books/popular').get(getPopularBooks)
router.route('/books/newest').get(getNewlyPublishedBooks)
router.route('/books/search').get(searchBooks)
router.route('/books/:id').get(getBookDetails)

//-----------Cart------------------//

router.route('/cart').post(verifyToken, addorRemoveFromCart).put(verifyToken, updateQuantity)


module.exports = router
