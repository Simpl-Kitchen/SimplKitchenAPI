const axios = require('axios');

const convertAmounts = async (queryObject) => {

    let requestHeaders = {
        'x-api-key': process.env.SPOONACULAR_API_KEY
    }

    const options = {
        method: 'GET',
        headers: requestHeaders,
        url: 'https://api.spoonacular.com/recipes/convert?ingredientName=flour&sourceAmount=2.5&sourceUnit=cups&targetUnit=grams',
        //params: opts,
    };

    const searchResults = axios.request(options).then(function (response) {
        return response.data
    }).catch(function (error) {
        console.error(error);
    });

    return searchResults
}