const Service = require('./service');

const getLiveFixtures = async (req, res) => {
    await Service.getLiveFixtures()
    .then((response) => {
        res.json(response)
    })
    .catch((error) => {
        res.json(error)
    })
}

const getAllHeadToHeadFixtures = async (req, res) => {
    await Service.getAllHeadToHeadFixtures()
    .then((response) => {
        res.json(response)
    })
    .catch((error) => {
        res.json(error)
    })
}

const getAllTransfer = async (req, res) => {
    await Service.getAllTransfer()
    .then((response) => {
        res.json(response)
    })
    .catch((error) => {
        res.json(error)
    })
}

const getAllStandings = async (req, res) => {
    await Service.getAllStandings()
    .then((response) => {
        res.json(response)
    })
    .catch((error) => {
        res.json(error)
    })
}
module.exports = { getLiveFixtures, getAllHeadToHeadFixtures, getAllTransfer, getAllStandings }