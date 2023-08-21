const PredictionService = require('./service');

const addPrediction = async (req, res) => {
    await PredictionService.addPrediction(req.body, req)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
};

const findByNameOfLeague = async (req, res) => {
    await PredictionService.findPredictionsByNameOfLeague(req.params.nameOfLeague)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
};

const findPredictionById = async (req, res) => {
    await PredictionService.findPredictionById(req.params.id)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
};

const updateByNameOfLeague = async (req, res) => {
    await PredictionService.updatePredictionByNameOfLeague(req.params.nameOfLeague, req.body)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
};

const getPredicationsApiCall = async(req, res) => {
    await PredictionService.getPredictionsApiCall()
    .then((response) => res.json(response))
    .catch((error) => res.json(error))
}

const getAllFetchedPrediction = async(req, res) => {
    await PredictionService.getAllFetchedPrediction()
    .then((response) => res.json(response))
    .catch((error) => res.json(error))
}

module.exports = { updateByNameOfLeague, findPredictionById, findByNameOfLeague, addPrediction, getPredicationsApiCall, getAllFetchedPrediction };
