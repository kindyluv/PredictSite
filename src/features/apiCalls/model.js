const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const fixtureSchema = new Schema({
    _id: {
        type: String
    },
    fixtures: {
        type: []
    }
}, {timestamp: true})

fixtureSchema.pre ('save', async function (next) {
    try {
      if (!this._id) {
        this._id = new mongoose.Types.ObjectId().toString();
      }
      return next ();
    } catch (error) {
      return next (error);
    }
  });


  const headToHeadFixtureSchema = new Schema({
    _id: {
        type: String
    },
    fixtures: {
        type: {}
    },
    league: {
        type: {}
    },
    teams: {
        type: {}
    },
    goals: {
        type: {}
    },
    score: {
        type: {}
    }
}, {timestamp: true})

headToHeadFixtureSchema.pre ('save', async function (next) {
    try {
      if (!this._id) {
        this._id = new mongoose.Types.ObjectId().toString();
      }
      return next ();
    } catch (error) {
      return next (error);
    }
  });

  const transferSchema = new Schema({
    _id: {
        type: String
    },
    transfer: {
        type: {}
    },
}, {timestamp: true})

transferSchema.pre ('save', async function (next) {
    try {
      if (!this._id) {
        this._id = new mongoose.Types.ObjectId().toString();
      }
      return next ();
    } catch (error) {
      return next (error);
    }
  });

  const standingSchema = new Schema({
    _id: {
        type: String
    },
    standing: {
        type: []
    },
}, {timestamp: true})

standingSchema.pre ('save', async function (next) {
    try {
      if (!this._id) {
        this._id = await new mongoose.Types.ObjectId().toString();
      }
      return next ();
    } catch (error) {
      return next (error);
    }
  });

const Standings = mongoose.model('Standings', standingSchema)  

const Transfer = mongoose.model('Transfer', transferSchema)  

const HeadToHeadFixture = mongoose.model('HeadToHeadFixture', headToHeadFixtureSchema)

const Fixture = mongoose.model('Fixture', fixtureSchema)

module.exports = { Fixture, HeadToHeadFixture, Transfer, Standings }
