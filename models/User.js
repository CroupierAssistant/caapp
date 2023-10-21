const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  profilePhoto: String
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
