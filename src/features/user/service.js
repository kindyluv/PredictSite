const User = require('./userModel');

async function findAllUsers() {
  try {
    const users = await User.find();
    return {
        data: users,
        message: 'Users successfully retrieved'
    };
  } catch (error) {
    throw error;
  }
}

async function findUserById(userId) {
  try {
    const user = await User.findById(userId);
    return {
        data: user,
        message: 'User successfully retrieved'
    };
  } catch (error) {
    throw error;
  }
}

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    return {
        data: user,
        message: 'User successfully retrieved'
    };
  } catch (error) {
    throw error;
  }
}

async function findUserByUsername(userName) {
  try {
    const user = await User.findOne({ userName: userName });
    return {
        data: user,
        message: 'User successfully retrieved'
    };
  } catch (error) {
    throw error;
  }
}

async function updateUserByUsername(userName, updates) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userName: userName },
      updates,
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function updateUserByEmail(email, updates) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      updates,
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  findAllUsers,
  findUserById,
  findUserByEmail,
  findUserByUsername,
  updateUserByUsername,
  updateUserByEmail
};
