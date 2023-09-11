const Service = require ('./service');

const getAllLiveFixturesApiCall = async (req, res) => {
  await Service.getAllLiveFixturesApiCall ()
    .then (response => {
      res.json ({
        response,
      });
    })
    .catch (error => {
      res.json ({
        message: error,
      });
    });
};

const getAllHeadToHeadFixturesApiCall = async (req, res) => {
  await Service.getAllHeadToHeadFixturesApiCall ()
    .then (response => {
      res.json ({
        response,
      });
    })
    .catch (error => {
      res.json ({
        message: error,
      });
    });
};

const getAllTransfersApiCall = async (req, res) => {
  await Service.getAllTransfersApiCall ()
    .then (response => {
      res.json ({
        response,
      });
    })
    .catch (error => {
      res.json ({
        message: error,
      });
    });
};

const getAllStandingsApiCall = async (req, res) => {
  await Service.getAllStandingsApiCall(req.body)
    .then (response => {
      res.json ({
        response,
      });
    })
    .catch (error => {
      res.json ({
        message: error,
      });
    });
};

const getAllLeaguesApiCall = async (req, res) => {
  console.log("League got here");
await Service.getAllLeaguesApiCall(req.params)
  .then (response => {
    res.json ({
      response,
    });
  })
  .catch (error => {
    res.json ({
      message: error,
    });
  });
};

module.exports = {
  getAllLeaguesApiCall,
  getAllLiveFixturesApiCall,
  getAllHeadToHeadFixturesApiCall,
  getAllTransfersApiCall,
  getAllStandingsApiCall,
};
