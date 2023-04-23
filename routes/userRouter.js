// Auth Route

const express = require('express')
//const { register, login } = require('../controllers/authController')
const { updateUser, getUser } = require('../controllers/userController')
const router = express.Router()
// controllers here
// router.post('/register', register)
// router.post('/login', login)

router.patch('/', updateUser)
router.get('/profile', getUser)

module.exports = router