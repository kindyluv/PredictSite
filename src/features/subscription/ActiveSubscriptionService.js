const ActiveSubscription = require ('./ActiveModel');
const Utils = require ('../../common/utils');
const Subscription = require ('./SubscriptionModel');
const User = require ('../user/userModel');
const PaymentService = require ('../payment/service');
const { NotFoundException } = require ('../../exceptions/exception');

const createActivePlan = async (request) => {
  const { userName, subscriptionId, amountPaid, paymentRef } = request;

  const subscription = await Subscription.findById (subscriptionId);
  if (!subscription) {
    throw new NotFoundException ('Invalid Subscription Plan');
  }

  const expiresAt = await Utils.calculateExpiresAt (
    new Date (),
    subscription.duration.toString ()
  );

  await PaymentService.verifyPayment (paymentRef);

  const user = await User.findOne({userName});
  if (!user) {
    throw new NotFoundException ('User Not Found');
  }

  const discountedAmount = subscription.amount - subscription.maxDiscount;

  const activateSubscription = new ActiveSubscription ({
    subscriptionAmount: discountedAmount,
    amountPaid,
    discountApplied: subscription.maxDiscount,
    subscriptionPlan: subscriptionId,
    duration: subscription.duration,
    currency: subscription.currency,
    paymentRef,
    user: userId,
    expiresAt,
  });

  user.activeSubscription.push (activateSubscription._id);
  await activateSubscription.save ();
  await user.save ();

  return {
    message: 'Active Subscription Created Successfully',
    data: activateSubscription,
  };
};

const deleteActivePlan = async (request) => {
  const { activeSubscriptionId, userName } = request;

  const user = await User.findOne({userName});
  if (!user) {
    throw new NotFoundException ('User Not Found');
  }

  const activeSubscription = await ActiveSubscription.findById (
    activeSubscriptionId
  );
  if (!activeSubscription) {
    throw new NotFoundException ('Active Subscription Not Found');
  }

  const index = user.activeSubscription.indexOf (activeSubscriptionId);
  if (index > -1) {
    user.activeSubscription.splice (index, 1);
  }

  activeSubscription.isDeleted = true;
  await activeSubscription.save ();
  await user.save ();

  return {
    message: 'Active Subscription Marked as Deleted Successfully',
    data: true,
  };
};

const getActivePlanByUser = async (request) => {
  const { userName } = request;

  const user = await User.findOne({userName});
  if (!user) {
    throw new NotFoundException ('User Not Found');
  }

  const currentDate = new Date ();

  const activeSubscriptions = await ActiveSubscription.find ({
    user: userId,
    isDeleted: false,
    expiresAt: {$gt: currentDate},
  });

  return {
    message: 'Active Subscriptions Retrieved Successfully',
    data: activeSubscriptions,
  };
};

const getAllActivePlan = async () => {
  const activeSubscriptions = await ActiveSubscription.find ({
    isDeleted: false,
  });

  return {
    message: 'All Active Subscriptions Retrieved Successfully',
    data: activeSubscriptions,
  };
};

module.exports = {
  createActivePlan,
  deleteActivePlan,
  getActivePlanByUser,
  getAllActivePlan,
};
