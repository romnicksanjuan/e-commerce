const express = require('express')
const router = express.Router()
const authMiddleware = require('../auth/auth.js')

const { createUser, Login, signInWithGoogle, test, logout, signInWithFaceBook, checkToken } = require('../controller/controller.js')

router.post('/', createUser)
router.get('/check-token', authMiddleware, checkToken)
router.post('/sign-in', Login)
router.post('/signIn-with-google', signInWithGoogle)
router.post('/signIn-with-facebook', signInWithFaceBook)
router.post('/logout', logout)
router.get('/test', authMiddleware, test)

module.exports = router