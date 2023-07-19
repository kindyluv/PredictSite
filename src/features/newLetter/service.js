const Newsletter = require('./newsLetterModel');

async function findById(id) {
  try {
    const newsletter = await Newsletter.findById(id);
    return newsletter;
  } catch (error) {
    throw new Error('An error occurred');
  }
}

async function findByEmail(email){
    try{
        const newsletter = await Newsletter.findOne({ email })
    }catch(error){
        throw new Error('An error occurred');
    }
}

async function create(request) {
  try {
    const { name, email } = request;
    const newsletter = await Newsletter.create({ name, email });
    return newsletter;
  } catch (error) {
    throw new Error('An error occurred');
  }
}

async function find() {
  try {
    const newsletters = await Newsletter.find();
    return newsletters;
  } catch (error) {
    throw new Error('An error occurred');
  }
}

module.exports = {
  findById,
  findByEmail,
  create,
  find,
};
