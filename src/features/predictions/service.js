const Prediction = require('./PredictionModel');
const fs = require('fs');
const axios = require('axios');

const addPrediction = async (predictionData, imageRequest) => {
    try {
      const { nameOfLeague, teamName, scores } = predictionData
      const prediction = new Prediction({ nameOfLeague, teamName, scores });

      if(imageRequest && imageRequest.file){
        const imageBuffer = fs.readFileSync (imageRequest.file.path);
        prediction.leagueImage = imageBuffer.toString ('base64');
      }

      const savedPrediction = await prediction.save();
      return {
        message: 'Predictaion Created Successfully',
        data: savedPrediction
      }
    } catch (error) {
      throw new Error(error.message);
    }
};

const findPredictionsByNameOfLeague = async (nameOfLeague) => {
    try {
        const prediction = await Prediction.find({ nameOfLeague });
      return {
        message: 'Prediction retrieve successfully',
        data: prediction
      }
    } catch (error) {
      throw new Error(error.message);
    }
};

const findPredictionById = async (id) => {
    try {
        const prediction = await Prediction.findById(id);
        return {
            message: 'Prediction retrieve successfully',
            data: prediction
        }
    } catch (error) {
      throw new Error(error.message);
    }
};

const updatePredictionByNameOfLeague = async (nameOfLeague, updateData) => {
    try {
        const prediction = await Prediction.findOneAndUpdate({ nameOfLeague }, updateData, { new: true });
        return {
            message: 'Prediction successfully edited',
            data: prediction
        }
    } catch (error) {
      throw new Error(error.message);
    }
};

module.exports = { addPrediction, findPredictionById, findPredictionsByNameOfLeague, updatePredictionByNameOfLeague }
