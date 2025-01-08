const express = require('express')
const router = express.Router()

const { createUser } = require('../controller/controller.js')

router.post('/',createUser)

module.exports = router