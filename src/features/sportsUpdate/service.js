const { Fixture, Standings, Transfer, HeadToHeadFixture } = require('../apiCalls/model');

const getLiveFixtures = async () => {
  const fixtures = await Fixture.find();
  const response = fixtures[0].fixtures;
  return {
    data: response,
    message: 'Fixtures retrieved successfully'
  };
}

const getAllHeadToHeadFixtures = async () => {
  const headToHead = await HeadToHeadFixture.find();
  return {
    data: headToHead,
    message: 'Head to head retrieved successfully'
  }
}

const getAllTransfer = async () => {
  const transfer = await Transfer.find();
  return {
    data: transfer,
    message: 'Transfer retrieved successfully'
  }
}

const getAllStandings = async () => {
  const standings = await Standings.find();
  return {
    data: standings,
    message: 'Standings retrieved successfully'
  }
}
module.exports = { getLiveFixtures, getAllHeadToHeadFixtures, getAllTransfer, getAllStandings }