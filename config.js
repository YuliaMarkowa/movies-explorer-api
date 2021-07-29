require('dotenv').config();

const {
  PORT = 5000,
  JWT_SECRET = 'some-secret-key',
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  MONGO_URL,
};
