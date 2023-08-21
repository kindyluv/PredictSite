const mongoose = require('mongoose');
const Schema = mongoose.Schema

const subscriptionSchema = new Schema({
    _id:{
        type: String
    },
    name: {
        type: String
    },
    amount: {
        type: Number
    },
    duration: {
        type: String,
        enum: ['ONE', 'THREE', 'SIX', 'TWELVE'],
        default: 'ONE',
    },
    currency: {
        type: String,
        enum: ['NGN', 'USD'],
        default: 'NGN',
    },
    status: {
        type: String
    },
    subscriptions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ActiveSubscription',
    },
    isActive: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    },
    maxDiscount: {
        type: Number
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
    },
});

subscriptionSchema.pre('save', async function (next) {
    try {
        if (!this._id) {
            this._id = await new mongoose.Types.ObjectId().toString();
        }
        return next();
    } catch (error) {
        return next(error);        
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
