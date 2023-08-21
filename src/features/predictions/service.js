const { PredictionApi, Prediction } = require('./model');
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
        message: 'Prediction2 retrieve successfully',
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
            message: 'Prediction3 retrieve successfully',
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

const getPredictionsApiCall = async () => {
  const options = {
      headers: {
          'x-rapidapi-key': process.env.APIKEY
      }
  };
  const url = `${process.env.FOOTBALLBaseURL}/predictions?fixture=198772`;
  const response = await axios.get(url, options);

  if (response.status === 200) {
      if (response.data.response.length !== 0) {
          const fixtureId = response.data.parameters.fixture;

          try {
              const existingPrediction = await PredictionApi.findOne({fixtureId: fixtureId})
              if (existingPrediction) {
                  existingPrediction.predictions = response.data.response;
                  const savedPrediction = await existingPrediction.save();
                  return{
                    data: savedPrediction,
                    message: 'Prediction Api Call Successful'
                  }
              } else {
                  const newPrediction = new PredictionApi({
                      fixtureId: fixtureId,
                      predictions: response.data.response
                  });
                  const savedPrediction = await newPrediction.save();
                  return{
                    data: {
                      response: savedPrediction
                    },
                    message: 'Prediction Api Calls Successful'
                  }
              }
          } catch (error) {
              console.error('Error saving prediction:', error);
          }
      }
  } else {
      return response.status;
  }
}; 

const getAllFetchedPrediction = async () => {
  const prediction = await PredictionApi.find();
  const response = prediction[0].predictions[0].predictions;
  return response;
}

module.exports = { addPrediction, findPredictionById, findPredictionsByNameOfLeague, updatePredictionByNameOfLeague, getPredictionsApiCall, getAllFetchedPrediction }
