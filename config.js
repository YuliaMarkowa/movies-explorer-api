require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3000,
  JWT_SECRET = 'some-secret-key',
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  MONGO_URL,
};
