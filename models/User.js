const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  showUserData: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
