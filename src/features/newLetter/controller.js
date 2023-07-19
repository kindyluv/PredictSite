const Newsletter = require ('./service');

async function findById (req, res) {
  await Newsletter.findById (req.params.id)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

async function findByEmail (req, res) {
  await Newsletter.findByEmail (req.params.email)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

async function add (req, res) {
  await Newsletter.create (req.body)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

async function findAll (req, res) {
  await Newsletter.find ()
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

module.exports = {
  findById,
  findByEmail,
  add,
  findAll,
};
