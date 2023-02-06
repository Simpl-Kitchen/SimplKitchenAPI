require('dotenv').config()
const Ingredient = require('../../models/Ingredient')
const ingredientsData = require('./ingredients.json')
const connectDB = require('../../db/connect')



// Need to get specific keys 
// name, name_scientific, wikipedia_id, picture_file_name, picture_content_type, picture_file_size

function trimObject(object) {
    const { name, name_scientific, description, wikipedia_id, food_group, food_subgroup, food_type, category } = object
    const newObject = {
        "name": name,
        "name_scientific": name_scientific,
        "description": description,
        "wikipedia_id": wikipedia_id,
        "food_group": food_group,
        "food_subgroup": food_subgroup,
        "food_type": food_type,
        "category": category

    }
    return newObject
}

function map(array, transform) {
    let mapped = []
    for (let element of array) {
        mapped.push(transform(element))
    }
    return mapped
}


const trimmedIngredientsData = map(ingredientsData, trimObject)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Ingredient.create(trimmedIngredientsData);
        console.log('Success !!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();