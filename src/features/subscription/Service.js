const Subscription = require('./SubscriptionModel');
const Admin = require('../admin/adminModel');
const fs = require('fs');
const { NotFoundException } = require('../../exceptions/exception');

const createPlan = async (request, imageRequest, adminId) =>{
    try{
        const admin = await new Admin.findOne({_id: adminId});
        if(!admin){
            throw new NotFoundException('Admin not found');
        }
        const { name, amount, duration, currency } = request;

        const subscription = new Subscription({name, amount, duration, currency })
    
        if(imageRequest && imageRequest.file){
            const imageBuffer = fs.readFileSync (imageRequest.file.path);
            subscription.image = imageBuffer.toString ('base64');
        }
    
        const savedSubscription = await subscription.save();
    
        return{
            message: 'Subscription Created Successfully',
            data: savedSubscription
        }
    }
    catch(error){
        return{
            message: 'Failed To Create Subscription',
            data: error
        }
    }

}

const activateSubscription = async (isActive, id, adminId)=>{
    const admin = await new Admin.findOne({_id: adminId});
    if(!admin){
        throw new NotFoundException('Admin not found');
    }

    const subscription = await Subscription.findById(id);
    if(!subscription){
        throw new NotFoundException('Invalid Subscription Plan');
    }

    const updateSubscription = await Subscription.findByIdAndUpdate(id, { isActive }, {new: true});

    return{
        message: 'Subscription Successully Activated',
        data: updateSubscription
    }

}

const updatePlan = async (request, imageRequest, adminId) =>{
    try {
        const admin = await new Admin.findOne({_id: adminId});
        if(!admin){
            throw new NotFoundException('Admin not found');
        }
        const { id, name, amount, duration, currency, status, maxDiscount } = request;
        const foundSubscription = await Subscription.findById(id);
        if(!foundSubscription){
            throw new NotFoundException('Invalid Subscription Plan');
        }

        const updatedFields = {
            name,
            amount,
            duration,
            currency,
            status,
            maxDiscount,
        };

        if (imageRequest && imageRequest.file) {
            const imageBuffer = fs.readFileSync(imageRequest.file.path);
            updatedFields.image = imageBuffer.toString('base64');
        }
      
        const updatedSubscription = await Subscription.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true }
        );
    
        return {
        message: 'Updated Successfully',
        data: updatedSubscription,
        };
    } catch (error) {
        return{
            message: 'Update Failed',
            data: error,
        }

    }
}

const deletePlan = async (id, adminId) =>{
    const admin = await Admin.findOne({_id: adminId});
    if(!admin){
        throw new NotFoundException('Admin not found');
    }

    const subscription = await Subscription.findById(id);
    if(!subscription){
        throw new NotFoundException('Invalid Subscription Plan');
    }

    await Subscription.updateOne({ _id: id }, {isDeleted: true})

    return{
        message: 'Subscription plan successfully deleted',
        data: true
    }
}

const getPlan = async (id, adminId) =>{
    const admin = await new Admin.findOne({_id: adminId});
    if(!admin){
        throw new NotFoundException('Admin not found');
    }
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      throw new NotFoundException('Invalid Subscription Plan');
    }
  
    return {
      message: 'Subscription plan retrieved successfully',
      data: subscription,
    };
}

const getAllPlan = async (adminId) =>{
    const admin = await new Admin.findOne({_id: adminId});
    if(!admin){
        throw new NotFoundException('Admin not found');
    }
    const subscriptions = await Subscription.find();
    return {
      message: 'All Subscription plans retrieved successfully',
      data: subscriptions,
    };
}

const getPlanByCategory = async (request) =>{
    const { category, adminId } = request

    const admin = await new Admin.findOne({_id: adminId});
    if(!admin){
        throw new NotFoundException('Admin not found');
    }

    const subscriptions = await Subscription.find({ category });
    return {
      message: 'Subscription plans retrieved successfully',
      data: subscriptions,
    };
}

module.exports = { getAllPlan, getPlan, getPlanByCategory, deletePlan, updatePlan, createPlan, activateSubscription }