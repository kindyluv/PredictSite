const mongoose = require('mongoose');
const Schema = mongoose.Schema

const newLetterSchema = Schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    }
}, { timestamps: true }
);

newLetterSchema.pre('save', async function (next) {
    try {
      if (!this._id) {
        this._id = await new mongoose.Types.ObjectId().toString();
      }
      return next();
    } catch (error) {
      return next(error);
    }
  });
  
  const NewsLetter = mongoose.model('NewsLetter', newLetterSchema);
  
  module.exports = NewsLetter;