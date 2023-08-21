const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schedulerSchema = Schema({
    _id: {
        type: String,
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
        this._id = await new mongoose.Types.ObjectId().toString();
      }
      return next();
    } catch (error) {
      return next(error);
    }
  });
  
  const Scheduler = mongoose.model('Scheduler', schedulerSchema);
  
  module.exports = Scheduler;