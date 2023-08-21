const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const predictionSchema = new Schema (
  {
    _id: {
      type: String,
    },
    nameOfLeague: {
      type: String,
      required: true,
    },
    leagueImage: {
      type: String,
    },
    teamName: {
      type: String,
    },
    scores: {
      type: Number,
    },
  },
  {timestamps: true}
);

predictionSchema.pre ('save', async function (next) {
  try {
    if (!this._id) {
      this._id = await new mongoose.Types.ObjectId().toString();
    }
    return next ();
  } catch (error) {
    return next (error);
  }
});

const predictionApiSchema = new Schema (
  {
    _id: {
      type: String,
    },
    fixtureId: {
      type: String,
    },
    predictions: {
      type: {},
    },
  },
  {timestamps: true}
);

predictionApiSchema.pre ('save', async function (next) {
  try {
    if (!this._id) {
      this._id = await new mongoose.Types.ObjectId().toString();
    }
    return next();
  } catch (error) {
    return next (error);
  }
});

const Prediction = mongoose.model ('Prediction', predictionSchema);
const PredictionApi = mongoose.model ('PredictionAPI', predictionApiSchema);

module.exports = { Prediction, PredictionApi };
