const express = require('express')
const router = express.Router()

const generateController = require('../controllers/generateController')

router.get('/recipes', generateController.generateNewQueue)

module.exports = router