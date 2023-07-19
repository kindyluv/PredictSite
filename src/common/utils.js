const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { v4: uuid } = require('uuid');

dotenv.config();

const hashPassword = async (plainPassword) => {
  const hash = bcrypt.hashSync(plainPassword, 11);
  return hash;
};

const createJWTWithPayload = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'sec-key-889754');
  payload.token = token;
  return payload;
};

const verifyJWT = (tokenToVerify) => {
  try {
    const payload = jwt.verify(tokenToVerify, process.env.JWT_SECRET || 'sec-key-889754');
    return payload;
  } catch (error) {
    return null;
  }
};

const passwordMatches = async (plainPassword, hash) => {
  const match = bcrypt.compareSync(plainPassword, hash);
  return match;
};

const DURATIONS = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEM: 10,
  ELEVEN: 11,
  TWELVE: 12
}

const calculateExpiresAt = async (currentDate, duration) => {
  const durationTime = DURATIONS[duration];

  if (!durationTime) {
    throw new Error('Invalid duration');
  }
  
  const expiresAt = add(currentDate, { months: durationTime });
  return expiresAt;
}

const generateUUID = () => uuid();

module.exports = { generateUUID, passwordMatches, verifyJWT, createJWTWithPayload, hashPassword, calculateExpiresAt, DURATIONS }