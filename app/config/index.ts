import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLICK_KEY = fs.readFileSync(path.resolve(__dirname, './keys/publick.key'))

dotenv.config()

export default {
  APP_PORT: process.env.APP_PORT,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: parseInt(process.env.MYSQL_PORT as string),
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_ROOT: process.env.MYSQL_ROOT,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  PRIVATE_KEY,
  PUBLICK_KEY
}

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLICK_KEY = PUBLICK_KEY
