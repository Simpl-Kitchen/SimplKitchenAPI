//const User = require('../models/User')

const User = require('../../models/User')

const getUserIntolerances = async (userId) => {
    const user = await User.findById(userId);
    return user.intolerances.toString();
};

module.exports = {
    getUserIntolerances,
};