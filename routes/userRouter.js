// Auth Route

const express = require('express')
//const { register, login } = require('../controllers/authController')
const { updateIntolerances } = require('../controllers/userController')
const router = express.Router()
// controllers here
// router.post('/register', register)
// router.post('/login', login)

router.post('/intolerances', updateIntolerances)

module.exports = router