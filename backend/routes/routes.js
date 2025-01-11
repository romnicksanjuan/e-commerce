const express = require('express')
const router = express.Router()

const { createUser, Login } = require('../controller/controller.js')

router.post('/',createUser)
router.post('/login',Login)

module.exports = router