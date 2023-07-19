const mongoose = require('mongoose');

const activeSubscriptionSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
  },
  subscriptionAmount: {
    type: Number,
  },
  amountPaid: {
    type: Number,
  },
  discountApplied: {
    type: Number,
  },
  subscriptionPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
  },
  duration: {
    type: String,
  },
  currency: {
    type: String,
  },
  paymentRef: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
  },
});

activeSubscriptionSchema.pre('save', async function (next) {
    try {
        if (!this._id) {
            this._id = new mongoose.Types.ObjectId().toString();
        }
    } catch (error) {
        return next(error);        
    }
});

const ActiveSubscription = mongoose.model('ActiveSubscription', activeSubscriptionSchema);

module.exports = ActiveSubscription;
