const AuthService = require('./service')

const AdminRegister = async (req, res) => {
    await AuthService.adminRegister(req.body)
    .then((response)=> {
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
}

const RegularUserRegister = async (req, res) => {
    await AuthService.userRegister(req.body)
    .then((response)=> {
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
}

const Login = async (req, res) => {
    await AuthService.login(req.body)
    .then((response)=>{
        res.json(response)
    })
    .catch((error)=>{
        res.json(error)
    })
}

module.exports = { AdminRegister, RegularUserRegister, Login };
