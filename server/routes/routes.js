const express = require('express')
const router = express.Router()
const { registerUser, loginUser, deleteUser, verifyOtp, refreshToken, timelinePosts, userPosts, updateUser, getUser, checkUsername, getBasicUserDetails, searchUser, checkEmail } = require('../controllers/user.controller')
const { verifyToken } = require('../middlewares/verifyToken')
const { followUser, likeDislikePost, reactToAPost, reactedUsers } = require('../controllers/actionsController')
const { getAllBooks, createBook, getBookDetails, getPopularBooks, searchBooks } = require('../controllers/books.controller')
const { addorRemoveFromCart, updateQuantity } = require('../controllers/cart.controller')

//Test
router.get('/test',(req,res) => res.status(200).json({message:'All good.'}))

//-----------Auth-----------------//

//Register
router.post('/register', registerUser)

//Login
router.post('/login', loginUser)

//Check if username exists
router.post('/username', checkUsername)

//Check if email exists
router.post('/email', checkEmail)

//Verify OTP
router.post('/verify-otp', verifyOtp)

//Refresh token
router.post('/refresh-token', refreshToken)

//Get basic user details without auth
router.get('/user-details/:id',getBasicUserDetails)


//-----------User Actions--------------//

//Get user details
router.get('/user/:id',verifyToken,getUser)

//Delete
router.delete('/user/:id', verifyToken, deleteUser)

//Update user
router.put('/user/:id', verifyToken, updateUser)



//-----------Books---------------------//

router.route('/books').get(getAllBooks).post(verifyToken, createBook)
router.route('/books/popular').get(getPopularBooks)
router.route('/books/search').get(searchBooks)
router.route('/books/:id').get(getBookDetails)

//-----------Cart------------------//

router.route('/cart').post(verifyToken, addorRemoveFromCart).put(verifyToken, updateQuantity)


module.exports = router
