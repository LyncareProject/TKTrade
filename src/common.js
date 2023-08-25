const HOST = 'whitemouse.dev'

const PORT = process.env.PORT || 8080
const CHAT_PORT = process.env.CHAT_PORT || 8081
const MONGO_USER = process.env.MONGO_USER || 'lyncare'
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'fls2022'
const MONGO_CLUSTER = process.env.MONGO_CLUSTER || 'lyncare.5ip2vsa.mongodb.net'
const MONGO_DBNAME = process.env.MONGO_DBNAME || 'tktrade'
const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'gmail'
const EMAIL_USER = process.env.EMAIL_USER || 'wevibeinc@gmail.com'
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'laxeqpufbozwxpnj'

/* eslint-disable prefer-destructuring */

/** @type {string} */
const APP_CONFIG_JSON = JSON.stringify({
  HOST,
  PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_DBNAME,
  EMAIL_SERVICE,
  EMAIL_USER,
  EMAIL_PASSWORD
}).replace(/"/g, '\\"')

module.exports = {
  HOST,
  PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  MONGO_DBNAME,
  APP_CONFIG_JSON,
  EMAIL_SERVICE,
  EMAIL_USER,
  EMAIL_PASSWORD
}
