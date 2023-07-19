const mongoose = require('mongoose')
const Schema = mongoose.Schema

const predictionSchema = new Schema({
    _id: {
        type: String,
    },
    nameOfLeague: {
        type: String,
        required: true,
    },
    leagueImage: {
        type: String
    },
    teamName: {
      type: String
    },
    scores: {
        type: Number
    }
    },
    { timestamps: true }
);

predictionSchema.pre('save', async function (next) {
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
  
  const Prediction = mongoose.model('Prediction', predictionSchema);
  
  module.exports = Prediction;