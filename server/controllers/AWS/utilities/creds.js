//require dotenv to read from .env file and grab credentials 
const dotenv = require('dotenv');
dotenv.config();

const creds = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }         
};         

module.exports = creds;         
