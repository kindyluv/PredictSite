const Service = require('./service')

const FetchLiveScore = async(req, res)=>{
    await Service.LiveScores()
    .then((response)=>{
        res.json(response)
    })
    .catch((error) => {
        res.json(error)
    })
}

module.exports = { FetchLiveScore }