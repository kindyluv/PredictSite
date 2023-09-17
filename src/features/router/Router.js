const express = require ('express');
const router = express.Router ();
const {
  AdminRegister,
  RegularUserRegister,
  Login,
} = require ('../auth/controller');
const {
  getAdminByEmail,
  getAdminByUserName,
  getAdminById,
  getAllAdmins,
  editAdminByEmail,
  editAdminByUserName,
} = require ('../admin/controller');
const {
  findAllUsers,
  findUserByEmail,
  findUserById,
  findUserByUsername,
  updateUserByEmail,
  updateUserByUsername,
} = require ('../user/controller');
const {initializePayment, verifyPayment} = require ('../payment/controller');
const {
  findAll,
  findByEmail,
  add,
  findById,
} = require ('../newLetter/controller');
const PredictionController = require ('../predictions/controller');
const multerInstance = require ('../../common/multer');
const SportController = require ('../sportsUpdate/controller');
const SchedulerController = require ('../scheduler/controller');
const SubscriptionController = require ('../subscription/Controller');
const ActiveSubscriptionController = require ('../subscription/ActiveSubscriptionController');
const ApiCallController = require ('../apiCalls/controller');
const {FetchLiveScore} = require('../leagueTable/controller')


//Fetch live scores
router.get('/livescores', FetchLiveScore)

// Authentication
router.post ('/admin-register', AdminRegister);
router.post ('/register', RegularUserRegister);
router.post ('/login', Login);

//Admin

router.get ('/', getAllAdmins);
router.get ('/:id', getAdminById);
router.get ('/email/:email', getAdminByEmail);
router.get ('/username/:username', getAdminByUserName);
router.put ('/username/:username', editAdminByUserName);
router.put ('/email/:email', editAdminByEmail);

//User

router.get ('/users', findAllUsers);
router.get ('/users/:id', findUserById);
router.get ('/users/email/:email', findUserByEmail);
router.get ('/users/username/:username', findUserByUsername);
router.put ('/users/username/:username', updateUserByUsername);
router.put ('/users/email/:email', updateUserByEmail);

// Payment

router.post ('/payment/initialize-payment', initializePayment);
router.get ('/payment/verify-payment/:reference', verifyPayment);

// NewsLetter

router.get ('/newsletter/:id', findById);
router.get ('/newsletter/:email', findByEmail);
router.post ('/newsletter/add', add);
router.get ('/newsletter/all', findAll);

// Prediction

router.get ('/predictions/predict-id/:id', PredictionController.findPredictionById);
router.put ('/predictions/nameOfLeague/:nameOfLeague', PredictionController.updateByNameOfLeague);
router.post ('/prediction', PredictionController.addPrediction);
router.get ('/predictions/all', PredictionController.getAllPredictions);
router.get ('/predictions/:nameOfLeague', multerInstance.single ('image'), PredictionController.findByNameOfLeague);

// Scheduler

router.post ('/scheduler', SchedulerController.createScheduler);
router.get ('/scheduler/all', SchedulerController.getAllScheduler);
router.get ('/scheduler/dateTime/:dateTime', SchedulerController.getScheduleByDataTime);
router.get ('/scheduler/title/:title', SchedulerController.getScheduleByTitle);

// Subscription

router.post ('/subscription', SubscriptionController.createPlan);
router.post ('/subscription/activate', SubscriptionController.activateSubscription);
router.put ('/subscription/:adminId', multerInstance.single ('image'), SubscriptionController.updatePlan);
router.delete ('/subscription/:id/:adminId', SubscriptionController.deletePlan);
router.get ('/subscription/:id/:adminId', SubscriptionController.getPlan);
router.get ('/subscription/all/:adminId', SubscriptionController.getAllPlan);
router.get ('/subscription/category', SubscriptionController.getPlanByCategory);

// ActiveSubscription

router.post ('/activeSubscription', ActiveSubscriptionController.createActivePlan);
router.delete ('/activeSubscription', ActiveSubscriptionController.deleteActivePlan);
router.get ('/activeSubscription/:userName', ActiveSubscriptionController.getActivePlanByUser);
router.get ('/activeSubscription/all', ActiveSubscriptionController.getAllActivePlan);

// Sport Update

router.get ('/live-fixtures', SportController.getLiveFixtures);
router.get ('/head-to-head', SportController.getAllHeadToHeadFixtures);
router.get ('/transfer', SportController.getAllTransfer);
router.get ('/standings', SportController.getAllStandings);

// Only Admins can call // Api Calls

router.get ('/api-call/fixtures', ApiCallController.getAllLiveFixturesApiCall);
router.get ('/api-call/head-to-head-fixture', ApiCallController.getAllHeadToHeadFixturesApiCall);
router.get ('/api-call/transfers', ApiCallController.getAllTransfersApiCall);
router.get ('/api-call/standings', ApiCallController.getAllStandingsApiCall);
router.get ('/api-call/leagues/:leagueName', ApiCallController.getAllLeaguesApiCall);
router.get ('/prediction/fetch-call', PredictionController.getPredicationsApiCall);
router.get ('/prediction/all/api-predict', PredictionController.getAllFetchedPrediction);


module.exports = router;
