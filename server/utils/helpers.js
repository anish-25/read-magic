const jwt = require('jsonwebtoken')

const createTokens = (user, req, res) => {
  const accessToken = jwt.sign({ "username": user.name, "id": user.id, "isAdmin": user.isAdmin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
  const refreshToken = jwt.sign({ "username": user.name, "id": user.id, "isAdmin": user.isAdmin }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
  res.status(201)
  let { password, isAdmin, createdAt, updatedAt, _id, ...filtered } = user._doc
  return res.json({
    ...filtered, id: user._doc._id,
    accessToken: { token: accessToken, maxAge: 300 * 1000 },
    refreshToken: { token: refreshToken, maxAge: 300 * 1000 },
  })
}

module.exports = { createTokens }