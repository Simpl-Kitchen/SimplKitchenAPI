const ShoppingList = require('../models/ShoppingList');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getShoppingList = async (req, res) => {
    res.send("Got shopping list")

}

module.exports = {
    getShoppingList
}