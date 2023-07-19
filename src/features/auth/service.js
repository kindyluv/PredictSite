const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../admin/adminModel');
const User = require('../user/userModel');
const Roles = require('../../common/roles');
const { hashPassword, passwordMatches, createJWTWithPayload, verifyJWT } = require('../../common/utils');
const { NotFoundException, AlreadyExistException, InvalidException } = require('../../exceptions/exception');

async function adminRegister(request) {
  try {
    const { userName, firstName, lastName, email, phoneNumber, password } = request;
    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        throw new AlreadyExistException('Admin already exists');
    }

    const hashedPassword = await hashPassword(password);

    const admin = new Admin({
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword
    });

    const savedAdmin = await admin.save();

    const token = jwt.sign({ adminId: savedAdmin._id, role: savedAdmin.role }, 'secretKey');

    return { message: 'Admin registered successfully', data: { admin: savedAdmin, token: token }};

  } catch (error) {
    console.error(error);
    return{ message: 'Internal server error', data: error }
  }
}

async function userRegister(request) {
    try {
      const { userName, firstName, lastName, email, phoneNumber, password } = request;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new AlreadyExistException('User already exists');
      }
  
      const hashedPassword = await hashPassword(password);
  
      const user = new User({
        userName,
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword
      });
  
      const savedUser = await user.save();
  
      const token = jwt.sign({ userId: savedUser._id, role: savedUser.role }, 'secretKey');
  
      return { message: 'User registered successfully', data: { user: savedUser, token: token } };
    } catch (error) {
      console.error(error);
      return { message: 'Internal server error', data: error };
    }
  }
  

async function login(request) {
    try {
      const { email, password } = request;
  
      const user = await User.findOne({ email });
      const admin = await Admin.findOne({ email });
      if (!user && !admin) {
        throw new NotFoundException('User not found');
      }
  
      const foundUser = user || admin;
  
      const isPasswordValid = await passwordMatches(password, foundUser.password);
      if (!isPasswordValid) {
        throw new InvalidException('Invalid password');
      }
  
      const token = jwt.sign({ userId: foundUser._id, role: foundUser.role }, 'secretKey');
  
      return {
        data: token,
        role: foundUser.role
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Internal server error',
        data: error
      };
    }
  }
  

module.exports = {
  adminRegister,
  userRegister,
  login
};
