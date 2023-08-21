const PredictionService = require ('../predictions/service');
const ApiService = require ('../apiCalls/service');
const cron = require ('node-cron');

exports.initScheduledJobs = () => {
const predictionJob = cron.schedule ('*/1 * * * *', async () => {
  try {
    const request = {fixture: 198772};
    const result = await PredictionService.getPredictionsApiCall (request);
    console.log (result.message);
  } catch (error) {
    console.error ('An error occurred:', error);
  }
});

const liveFixturesJob = cron.schedule ('*/1 * * * *', async () => {
  try {
    const result = await ApiService.getAllLiveFixturesApiCall ();
    console.log (result.message);
  } catch (error) {
    console.error ('Error fetching live fixtures:', error);
  }
});

const headToHeadFixturesJob = cron.schedule ('*/1 * * * *', async () => {
  try {
    const result = await ApiService.getAllHeadToHeadFixturesApiCall ();
    console.log (result.message);
  } catch (error) {
    console.error ('Error fetching head-to-head fixtures:', error);
  }
});

const transferJob = cron.schedule ('*/1 * * * *', async () => {
  try {
    const result = await ApiService.getAllTransfersApiCall ();
    console.log (result.message);
  } catch (error) {
    console.error ('Error fetching head-to-head fixtures:', error);
  }
});

transferJob.start ();
predictionJob.start ();
liveFixturesJob.start ();
headToHeadFixturesJob.start ();

process.stdin.resume ();
}

