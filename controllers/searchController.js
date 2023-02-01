require('dotenv').config()
const { StatusCodes } = require('http-status-codes')
const axios = require("axios");

const searchIngredients = async (req, res) => {

    const searchTerm = 'Cream Cheese'
    const options = {
        method: 'GET',
        url: process.env.URL,
        params: { ingr: searchTerm },
        headers: {
            'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
        }
    };


    const searchResults = axios.request(options).then(function (response) {
        const data = []
        foodData = response.data.hints
        for (let i = 0; i < 5; i++) {
            const { food } = response.data.hints[i]
            data.push(food)
        }
        //console.log(data)
        return data
    }).catch(function (error) {
        console.error(error);
    });

    foodData = await searchResults
    res.status(StatusCodes.OK).json({ foodData })
    //console.log(foodData);
}

module.exports = searchIngredients