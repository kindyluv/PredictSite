const UserService = require ('./service');

async function findAllUsers (req, res) {
    await UserService.findAllUsers ()
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

async function findUserById (req, res) {
  await UserService.findUserById (req.params.userId)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

async function findUserByEmail (req, res) {
    await UserService.findUserByEmail (req.params.email)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

async function findUserByUsername (req, res) {
    await UserService.findUserByUsername (req.params.userName)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

async function updateUserByUsername (req, res) {
    await UserService.updateUserByUsername (req.params.userName, req.body)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

async function updateUserByEmail (req, res) {
    await UserService.updateUserByEmail (req.params.email, req.body)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

module.exports = {
  findAllUsers,
  findUserById,
  findUserByEmail,
  findUserByUsername,
  updateUserByUsername,
  updateUserByEmail,
};
