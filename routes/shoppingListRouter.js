const express = require('express')
const router = express.Router()

const {getShoppingList} = require("../controllers/shoppingListController")

router.route('/').get(getShoppingList)

module.exports = router