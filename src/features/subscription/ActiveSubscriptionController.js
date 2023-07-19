const ActiveSubscriptionService = require('./ActiveSubscriptionService');

const createActivePlan = async (req, res) =>{
    await ActiveSubscriptionService.createActivePlan(req.body)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

const deleteActivePlan = async (req, res) =>{
    await ActiveSubscriptionService.deleteActivePlan(req.body)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

const getActivePlanByUser = async (req, res) =>{
    await ActiveSubscriptionService.getActivePlanByUser(req.params)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

const getAllActivePlan = async (req, res) =>{
    await ActiveSubscriptionService.getAllActivePlan()
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

module.exports = { createActivePlan, deleteActivePlan, getActivePlanByUser, getAllActivePlan }