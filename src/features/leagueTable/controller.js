// const Service = require('./service')
const axios = require('axios');

// const FetchLiveScore = async(req, res)=>{
//     await Service.LiveScores()
//     .then((response)=>{
//         res.json(response)
//     })
//     .catch((error) => {
//         res.json(error)
//     })
// }

const FetchLiveScore = async(req, res)=>{
    const options = {
        method: 'GET',
        url: 'https://sports-live-scores.p.rapidapi.com/football/live',
        headers: {
          'X-RapidAPI-Key': 'eeeaacac97mshcb9675db4b7ae05p1da0dbjsn09680b7dde7a',
          'X-RapidAPI-Host': 'sports-live-scores.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log('Sport feed response --> ',response.data);
      res.json(response.data)
      } catch (error) {
        console.error('Sport feed error --> ',error);
      }  
}

module.exports = { FetchLiveScore }