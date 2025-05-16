import 'dotenv/config'

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  HOST: process.env.APP_HOST,
  PORT: process.env.APP_PORT,
  BUILD_MODE: process.env.BUILD_MODE,
  AUTHOR: process.env.AUTHOR
}
