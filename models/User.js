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
  }
});

const User = mongoose.model('User', userSchema, 'users');

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {User, findUserById};
