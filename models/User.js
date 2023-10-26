const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  showUserData: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
