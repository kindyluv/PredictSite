const axios = require('axios');

const SportUpdate = async () => {
    const options = {
        method: 'GET',
        url: 'https://sportspage-feeds.p.rapidapi.com/teams',
        params: {
          league: 'PREMIERLEAGUE'
        },
        headers: {
          'X-RapidAPI-Key': 'eeeaacac97mshcb9675db4b7ae05p1da0dbjsn09680b7dde7a',
          'X-RapidAPI-Host': 'sportspage-feeds.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log('Sport update --> ',response.data);
          return response.data;
      } catch (error) {
          console.error(error);
          return error;
      }
}

module.exports = { SportUpdate }