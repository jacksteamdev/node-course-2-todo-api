const mongoose = require('mongoose')
const validator = require('validator')

let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true, // email is different from all other emails in the collection
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

module.exports = {User}
