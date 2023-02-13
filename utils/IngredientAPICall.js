// // Will move the API call here

// const callIngredientAPI = async (query) => {
    
//     const options = {
//         method: 'GET',
//         url: process.env.URL,
//         params: { ingr: search },
//         headers: {
//             'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
//             'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
//         }
//     };


//     const searchResults = axios.request(options).then(function (response) {
//         const data = []
//         foodData = response.data.hints
//         for (let i = 0; i < foodData.length; i++) {
//             const { food } = response.data.hints[i]
//             data.push(food)
//         }
//         return data
//     }).catch(function (error) {
//         console.error(error);
//     });
// }