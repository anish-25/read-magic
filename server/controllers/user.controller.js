const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createTokens, getFireBaseUrl } = require('../utils/helpers')
const { default: mongoose } = require('mongoose')
require('dotenv').config()
const firebase = require('../firebase')


const admin = require('firebase-admin');
const serviceAccount = require('../firebase-cred.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://readmagic-1acec.appspot.com'
});

const registerUser = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)
    if (!name || !email || !password) {
        res.status(400).json({
            message: "All fields are mandatory"
        })
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(400).json({
            message: "User with this email exists already"
        })
    }
    else {
        const user = await User.create({
            name,
            username,
            email,
            password: hashedPass
        })

        if (user) {
            createTokens(user, req, res)
        }
    }
})

const checkUsername = asyncHandler(async (req, res) => {
    const { username } = req.body
    const user = await User.findOne({ username })
    if (user) {
        return res.status(400).json({ userExists: true, message: "This username has been taken already." })
    }
    else {
        return res.status(200).json({ userExists: false, message: "Username available" })
    }
})

const checkEmail = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user) {
        return res.status(400).json({ userExists: true, message: "This email has been taken already." })
    }
    else {
        return res.status(200).json({ userExists: false, message: "email available" })
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ $or: [{ email }, { username: email }] })
    if (user && (await bcrypt.compare(password, user.password))) {
        createTokens(user, req, res)
    }
    else {
        res.status(404).json({
            status: 404,
            message: "Invalid username/password"
        })

    }
}
)

const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        if (otp == 1234) {
            let { id, email, name, isEmailVerified, createdAt, updatedAt } = userExists
            if (isEmailVerified) {
                res.status(401).json({ message: "Email has been verified already" })
            }
            else {
                const user = await User.findOneAndUpdate({ email }, { isEmailVerified: true }, { new: true })

                return createTokens(user, req, res)
            }
        }
        else {
            return res.status(401).json({ message: "Invalid Otp" })
        }
    }
    else {
        return res.status(404).json({ message: "User not found" })
    }
}

)

const getUser = asyncHandler(async (req, res) => {
    try {
        const identifier = req.params.id
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            const user = await User.findById(identifier)
            if (user) {
                await getFireBaseUrl(user)
                const { password, ...rest } = user._doc
                return res.status(200).json(rest)
            }
            return res.status(400).json({ message: "User doesn't exist" })
        }
        else {
            const user = await User.findOne({ username: identifier })
            if (user) {
                const { password, ...rest } = user._doc
                return res.status(200).json(rest)
            }
            return res.status(400).json({ message: "User doesn't exist" })
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
})

const getBasicUserDetails = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        if (user) {
            const { email, id, username } = user._doc
            return res.json({ email, id, username })
        }
        return res.status(400).json({ message: "User doesn't exist" })
    }
    catch (err) {
        res.status(500).json(err)
    }
})

const updateUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (user) {
            if (req.user.id == req.params.id || req.user.isAdmin) {
                const { email, username, isEmailVerified, _id, isAdmin, createdAt, updatedAt, ...rest } = req.body;

                if (rest.password) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPass = await bcrypt.hash(rest.password, salt);
                    rest.password = hashedPass;
                }
                const updatedUser = await User.findByIdAndUpdate(userId, { $set: rest }, { new: true });
                if (updatedUser) {
                    let filtered = {
                        name: updatedUser.name,
                        username: updatedUser.username,
                        email: updatedUser.email,
                        mobile: updatedUser.mobile,
                    };
                    return res.status(200).json(filtered);
                }
                return res.status(400).json({ message: "User update failed" });
            }
            return res.status(403).json({ message: "Unauthorized" });
        }
        return res.status(400).json({ message: "User doesn't exist" });
    } catch (err) {
        res.status(500).json(err);
    }
});


const deleteUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        if (user) {
            if (req.user.id == req.params.id || req.user.isAdmin) {
                await user.deleteOne()
                return res.json({ message: "User has been deleted succesfully" })
            }
            return res.status(403).json({ message: "Unauthorized" })
        }
        return res.status(400).json({ message: "User doesn't exist" })
    }
    catch (err) {
        res.status(500).json(err)
    }
})

const refreshToken = asyncHandler(async (req, res) => {
    let token = req.body.refreshToken
    if (token) {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Token expired. Please Login' })
            const user = await User.findById(decoded.id)
            if (user) createTokens(user, req, res)
            else return res.status(403).json({ message: 'Invalid Token' })
        }))
    }
    else {
        res.status(400).json({ message: 'Token is required' })
    }
})


const searchUser = asyncHandler(async (req, res) => {
    try {
        const keyword = req.body.keyword
        if (!keyword) return res.status(401).json({ message: "Keyword is required" })
        const result = await User.find({ $or: [{ username: { $regex: keyword, $options: 'i' } }, { name: { $regex: keyword, $options: 'i' } }] }, { password: 0, followers: 0, following: 0, isAdmin: 0, posts: 0, bio: 0, createdAt: 0, updatedAt: 0 })
        return res.status(200).json({ isSuccess: true, data: result })
    } catch (err) {
        res.status(500).json(err)
    }
})


const uploadProfilePic = asyncHandler(async (req, res) => {
    try {
        const file = req.file;
        const userId = req?.user?.id
        if (!file) {
            return res.status(400).json({ error: 'No file received' });
        }

        const bucket = admin.storage().bucket();
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return res.status(400).send('File is not a valid image.');
        }
        let dest = `avatars/${userId}.png`
        const blob = bucket.file(dest);
        const blobStream = blob.createWriteStream();
        blobStream.on('error', (error) => {
            return res.status(500).json({ error: 'Failed to upload file' });
        });

        blobStream.on('finish', async () => {
            const storageRef = firebase.storage().ref('avatars/' + req.user.id + '.png')
            const url = await storageRef.getDownloadURL();
            return res.status(200).json({ url });
        });

        blobStream.end(file.buffer);
    } catch (err) {
        return res.status(500).json(err)
    }
})


module.exports = { registerUser, loginUser, checkUsername, checkEmail, getBasicUserDetails, updateUser, uploadProfilePic, getUser, deleteUser, verifyOtp, refreshToken, searchUser }