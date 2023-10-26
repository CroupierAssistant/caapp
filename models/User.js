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

const findUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {User, findUserByUsername};
