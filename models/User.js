const mongoose = require('mongoose');
const { connectionUser } = require('../db');

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  keyboardPosition: {
    type: String,
    default: 'center',
  },
  showUserData: {
    type: Boolean,
    default: false,
  },
  birthday: Date,
  experience: [
    { 
      startDate: Date,
      endDate: Date,
      jobName: String,
      jobPosition: String,
      location: String,
    }
  ],
  phoneNumber: String,
  socialMedia: {
    instagram: String, 
    facebook: String, 
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  friendsRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  myFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const User = connectionUser.model('User', userSchema, 'users');

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {User, findUserById};
