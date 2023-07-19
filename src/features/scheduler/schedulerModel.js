const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schedulerSchema = Schema({
    _id: {
        type: String,
        unique: true,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    dateTime: {
      type: Date,
    }
}, { timestamps: true }
);

schedulerSchema.pre('save', async function (next) {
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
  
  const Scheduler = mongoose.model('Scheduler', schedulerSchema);
  
  module.exports = Scheduler;