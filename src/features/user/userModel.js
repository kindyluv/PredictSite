const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Roles = require('../../common/enums')

const userSchema = new Schema(
  {
    _id: {
      type: String
    },
    userName: {
      type: String,
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
      default: Roles.REGULARUSER
    },
    activeSubscription: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ActiveSubscription',
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  try {
    if (!this._id) {
      this._id = await new mongoose.Types.ObjectId().toString();
    }

    if (!this.isModified('password')) {
      return next();
    }
    return next();
  } catch (error) {
    return next(error);
  }
});
  
const User = mongoose.model('User', userSchema);

module.exports = User;