// Exports 
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { allowedIntolerances, allowedDiets } = require('../utils/spoonacular/allowedFilterOptions.js')
// User Schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide a first name'],
    maxlength: 50,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: [true, 'Please a last name'],
    maxlength: 50,
    minlength: 3,
  },
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    maxlength: 50,
    minlength: 3,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  intolerances: {
    type: [String],
    default: [],
    validate: [
      {
        validator: function (array) {
          return array.every(value => allowedIntolerances.includes(value));
        },
        message: 'One or more intolerances are not supported',
      },
      {
        validator: function (array) {
          const uniqueArray = [...new Set(array)];
          return array.length === uniqueArray.length;
        },
        message: 'Duplicate intolerances are not allowed',
      },
    ],
  },
  diets: {
    type: [String],
    validate: [
      {
        validator: function (array) {
          return array.every(value => allowedDiets.includes(value));
        },
        message: 'One or more diets are not supported',
      },
      {
        validator: function (array) {
          const uniqueArray = [...new Set(array)];
          return array.length === uniqueArray.length;
        },
        message: 'Duplicate diets are not allowed',
      },
    ],
  }
})
// Encryption of user password using 
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}
//Password validation methods
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}
// Exporting the model
module.exports = mongoose.model('User', UserSchema)
