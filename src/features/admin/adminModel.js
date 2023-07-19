const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Roles = require('../../common/roles')

const adminUserSchema = new Schema(
  {
    _id: {
      type: String
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    phoneNumber: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    role: {
        type: String,
        default: Roles.ADMIN
      }
  },
  { timestamps: true }
);

adminUserSchema.pre('save', async function (next) {
  try {
    if (!this._id) {
      this._id = new mongoose.Types.ObjectId().toString();
    }

    if (!this.isModified('password')) {
      return next();
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

const Admin = mongoose.model('Admin', adminUserSchema);

module.exports = Admin;
