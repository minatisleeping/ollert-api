import 'dotenv/config'

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  HOST: process.env.APP_HOST,
  PORT: process.env.APP_PORT,

  AUTHOR: process.env.AUTHOR
}
