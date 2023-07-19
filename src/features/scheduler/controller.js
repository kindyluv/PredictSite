const SchedulerService = require('./service');

const createScheduler = async (req, res) => {
    await SchedulerService.createScheduler(req.body)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

const getAllScheduler = async (req, res) => {
    await SchedulerService.getAllScheduler()
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

const getScheduleByDataTime = async (req, res) => {
    await SchedulerService.getScheduleByDataTime(req.params)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}

const getScheduleByTitle = async (req, res) => {
    await SchedulerService.getScheduleByTitle(req.params)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=> {
        res.json(error)
    })
}


module.exports = { createScheduler, getAllScheduler, getScheduleByDataTime, getScheduleByTitle }