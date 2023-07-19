const {
  findAdminByEmail,
  findAdminById,
  findAdminByUserName,
  findAllAdmins,
  updateAdminByUserName,
  updateAdminByEmail,
} = require ('./service');

const getAdminByEmail = async (req, res) => {
    await findAdminByEmail (req.params.email)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
};

async function getAdminById (req, res) {
    await findAdminById (req.params.id)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

async function getAdminByUserName (req, res) {
    await findAdminByUserName (req.params.username)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

async function editAdminByUserName (req, res) {
    await updateAdminByUserName (req.body)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

async function editAdminByEmail (req, res) {
    await updateAdminByEmail (req.body)
    .then (response => {
      res.json (response);
    })
    .catch (error => {
      res.json (error);
    });
}

async function getAllAdmins(req, res){
    await findAllAdmins()
    .then (response => {
        res.json (response);
      })
      .catch (error => {
        res.json (error);
      });
}

module.exports = {
  getAllAdmins,
  getAdminById,
  getAdminByEmail,
  getAdminByUserName,
  editAdminByUserName,
  editAdminByEmail,
};
