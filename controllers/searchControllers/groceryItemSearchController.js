//const externalAPICalls = require('../utils/externalAPICalls')
const externalAPICalls = require('../../utils/externalAPICalls')
const userHelpers = require('../../utils/helpers')

const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../../errors')

const searchGroceryProducts = async (req, res) => {
    
    // Set up variables. Destructure req.query and req.user
    const { search } = req.query
    const { userId } = req.user
    const queryObject = {}

    // If no search term provided throw error
    if (!search) {
        throw new BadRequestError("No search term provided")
    }

    // Construct query object
    queryObject.search = search

    // Call API for product data
    productData = await externalAPICalls.searchGroceryProductsAPICall(queryObject);

    // If no results throw error
    if (productData.totalProducts == 0) {
        throw new NotFoundError(`No results found for search term '${queryObject.search}'`)
    }

    // Return data to frontend
    res.status(StatusCodes.OK).json({ productData })
}
const searchGroceryProductInformation = async (req, res) => {
    
    // Set up variables. Destructure req.params and req.user
    const {
        params: { id: productId }
    } = req
    const queryObject = {}

    queryObject.id = productId

    if (isNaN(queryObject.id)) {

        throw new BadRequestError("ID parameter is not a number")
    }

    // Call API for product data
    productData = await externalAPICalls.groceryProductInformationAPICall(queryObject)

    // If no results throw error
    if (!productData) {
        throw new NotFoundError(`No results found with id ${queryObject.id}`)
    }

    // Return data to frontend
    res.status(StatusCodes.OK).json({ productData })
}
const searchGroceryProductByUPC = async (req, res) => {
    
    // Set up variables. Destructure req.params and req.user
    const {
        params: { upc: productUpc }
    } = req
    const queryObject = {}

    // Construct query object
    queryObject.upc = productUpc

    //console.log(queryObject.upc)

    // If upc is not a number throw error
    if (isNaN(queryObject.upc)) {

        throw new BadRequestError("UPC parameter must be a number")
    }

    // Call API for product data
    productData = await externalAPICalls.searchByUpcAPICall(queryObject)

    // If no results throw error
    if (!productData || productData.status == "failure") {
        throw new NotFoundError(`No results found with upc ${queryObject.upc}`)
    }

    // Return data to frontend
    res.status(StatusCodes.OK).json({ productData })
}

module.exports = {
    searchGroceryProducts,
    searchGroceryProductInformation,
    searchGroceryProductByUPC,
}