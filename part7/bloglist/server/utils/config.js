/*
 * Database configurations.
 * Requires .env for credentials
 * and reminder to never push .env
*/
require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  PORT,
  MONGODB_URI
}

