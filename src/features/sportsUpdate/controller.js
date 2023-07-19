const Service = require('./service');

const SportUpdate = async (req, res) => {
    await Service.SportUpdate()
    .then((response) => {
        res.json(response)
    })
    .catch((error) => {
        res.json(error)
    })
}

module.exports = { SportUpdate }