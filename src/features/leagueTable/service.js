const axios = require('axios');

const LiveScores = async () => {
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
        return response
      } catch (error) {
        console.error('Sport feed error --> ',error);
      }
}

module.exports = { LiveScores }