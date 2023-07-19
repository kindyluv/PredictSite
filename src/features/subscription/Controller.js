const SubscriptionService = require('./Service');

const createPlan = async (req, res) =>{
    await SubscriptionService.createPlan(req.body, req.file, req.params)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

const activateSubscription = async (req, res) =>{
    const {isActive, id, adminId} = req.body;
    SubscriptionService.activateSubscription(isActive, id, adminId)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

const updatePlan = async (req, res) =>{
    await SubscriptionService.updatePlan(req.body, req.file, req.params)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

const deletePlan = async (req, res) =>{
    const { id, adminId } = req.params;
    await SubscriptionService.deletePlan(id, adminId)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

const getPlan = async (req, res) =>{
    const { id, adminId } = req.params;
    await SubscriptionService.getPlan(id, adminId)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

const getAllPlan = async (req, res) =>{
    await SubscriptionService.getAllPlan(req.params)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

const getPlanByCategory = async (req, res) =>{
    await SubscriptionService.getPlanByCategory(req.body)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

module.exports = { getAllPlan, getPlan, getPlanByCategory, deletePlan, updatePlan, createPlan, activateSubscription }