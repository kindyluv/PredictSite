const Admin = require('./adminModel');
const { NotFoundException, AlreadyExistException, InvalidException } = require('../../exceptions/exception');

async function findAllAdmins() {
  try {
    const admins = await Admin.find();
    return admins;
  } catch (error) {
    throw new Error('Failed to retrieve admins');
  }
}

async function findAdminById(id) {
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  } catch (error) {
    throw new Error('Failed to retrieve admin');
  }
}

async function findAdminByEmail(email) {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  } catch (error) {
    throw new InvalidException('Failed to retrieve admin');
  }
}

async function findAdminByUserName(username) {
  try {
    const admin = await Admin.findOne({ userName: username });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  } catch (error) {
    throw new InvalidException('Failed to retrieve admin');
  }
}

async function updateAdminByUserName(request) {
  try {
    const { firstName, lastName, email, phoneNumber, username } = request;
    const updatedAdmin = await adminService.updateAdminByUserName(
      username,
      firstName,
      lastName,
      email,
      phoneNumber
    );
    if (!updatedAdmin) {
      throw new NotFoundException('Admin not found');
    } else {
      return{
        message: 'Data retrived successfully',
        data: updatedAdmin
      }
    }
  } catch (error) {
    return{ message: 'Internal server error', data: error };
  }
}

async function updateAdminByEmail(request) {
  try {
    const { firstName, lastName, username, phoneNumber, email } = request;
    const updatedAdmin = await adminService.updateAdminByEmail(
      email,
      firstName,
      lastName,
      username,
      phoneNumber
    );
    if (!updatedAdmin) {
      throw new NotFoundException('Admin not found');
    } else {
      return{
        message: 'Data retrived successfully',
        data: updatedAdmin
      }
    }
  } catch (error) {
    return{ message: 'Internal server error', data: error };
  }
}

module.exports = {
  findAllAdmins,
  findAdminById,
  findAdminByEmail,
  findAdminByUserName,
  updateAdminByUserName,
  updateAdminByEmail,
};
