require('dotenv').config()

//let PORT = process.env.PORT
let PORT = 3000
//let MONGODB_URI = process.env.MONGODB_URI

const SECRET = process.env.SECRET

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}