const express = require('express')
const router = express.Router()

const generateController = require('../controllers/generateController')

router.get('/', generateController.getQueue)
router.get('/new', generateController.generateNewQueue)
router.patch('/remove', generateController.removeFromQueue)
router.patch('/add', generateController.addToQueue)

module.exports = router