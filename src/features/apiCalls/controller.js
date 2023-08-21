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
    console.log('Got here console')
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

module.exports = {
  getAllLiveFixturesApiCall,
  getAllHeadToHeadFixturesApiCall,
  getAllTransfersApiCall,
  getAllStandingsApiCall,
};
