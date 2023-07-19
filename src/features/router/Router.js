const express = require("express");
const router = express.Router();
const { AdminRegister, RegularUserRegister, Login } = require('../auth/controller');
const { getAdminByEmail, getAdminByUserName, getAdminById, getAllAdmins, editAdminByEmail, editAdminByUserName } = require('../admin/controller');
const { findAllUsers, findUserByEmail, findUserById, findUserByUsername, updateUserByEmail, updateUserByUsername  }  = require('../user/controller');
const { initializePayment, verifyPayment } = require('../payment/controller');
const { findAll, findByEmail, add, findById } = require('../newLetter/controller');
const { findPredictionById, findByNameOfLeague, updateByNameOfLeague, addPrediction } = require('../predictions/controller');
const multerInstance = require('../../common/multer');
const { FetchLiveScore } = require('../leagueTable/controller');
const { SportUpdate } = require('../sportsUpdate/controller');
const SchedulerController = require('../scheduler/controller');
const SubscriptionController = require('../subscription/Controller');
const ActiveSubscriptionController = require('../subscription/ActiveSubscriptionController');

// Authentication
router.post('/admin-register', AdminRegister);
router.post('/register', RegularUserRegister);
router.post('/login', Login);

//Admin

router.get('/', getAllAdmins);
router.get('/:id', getAdminById);
router.get('/email/:email', getAdminByEmail);
router.get('/username/:username', getAdminByUserName);
router.put('/username/:username', editAdminByUserName);
router.put('/email/:email', editAdminByEmail);

//User

router.get('/users', findAllUsers);
router.get('/users/:id', findUserById);
router.get('/users/email/:email', findUserByEmail);
router.get('/users/username/:username', findUserByUsername);
router.put('/users/username/:username', updateUserByUsername);
router.put('/users/email/:email', updateUserByEmail);

// Payment

router.post('/payment/initialize-payment', initializePayment);
router.get('/payment/verify-payment/:reference', verifyPayment);

// NewsLetter

router.get('/newsletter/:id', findById);
router.get('/newsletter/:email', findByEmail);
router.post('/newsletter/add', add);
router.get('/newsletter/all', findAll);

// Prediction

router.get('/predictions/:nameOfLeague', multerInstance.single("image"), findByNameOfLeague);
router.get('/predictions/:id', findPredictionById);
router.put('/predictions/:nameOfLeague', updateByNameOfLeague);
router.post('/predictions', addPrediction);

// Scheduler

router.post('/scheduler', SchedulerController.createScheduler)
router.get('/scheduler/all', SchedulerController.getAllScheduler)
router.get('/scheduler/dateTime/:dateTime', SchedulerController.getScheduleByDataTime)
router.get('/scheduler/title/:title', SchedulerController.getScheduleByTitle)

// Subscription

router.post('/subscription', SubscriptionController.createPlan);
router.post('/subscription/activate', SubscriptionController.activateSubscription);
router.put('/subscription/:adminId', multerInstance.single("image"), SubscriptionController.updatePlan);
router.delete('/subscription/:id/:adminId', SubscriptionController.deletePlan);
router.get('/subscription/:id/:adminId', SubscriptionController.getPlan);
router.get('/subscription/all/:adminId', SubscriptionController.getAllPlan);
router.get('/subscription/category', SubscriptionController.getPlanByCategory);


// ActiveSubscription

router.post('/activeSubscription', ActiveSubscriptionController.createActivePlan);
router.delete('/activeSubscription', ActiveSubscriptionController.deleteActivePlan);
router.get('/activeSubscription/:userName', ActiveSubscriptionController.getActivePlanByUser);
router.get('/activeSubscription/all', ActiveSubscriptionController.getAllActivePlan)

// Sport Update
router.get('/sport-update', SportUpdate)

// Live Scores
router.get('/live-score', FetchLiveScore)

module.exports = router;