const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  profilePicture: {
    type: Buffer,
  },
  showUserData: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema, 'users');

// module.exports = User;

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {User, findUserById};
