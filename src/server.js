/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { API_v1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions)) // Xử lí CORS

  app.use(express.json())

  app.use('/v1', API_v1)

  // Middleware: Error Handler(xử lý lỗi tập trung)
  app.use(errorHandlingMiddleware)

  app.listen(env.PORT, env.HOST, () => {
    console.log(`3. Hi ${env.AUTHOR}, Back-end server is running at http://${env.HOST}:${env.PORT}/`)
  })

  exitHook(() => {
    console.log('\n4. Disconnecting from MongoDB..')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB Could Atlas!')
  })
}

// Chỉ khi kết nối tới Database thành công thì mới Start Server Back-end lên
// IIFE: Immediately Invoked Function Expression
(async () => {
  try {
    console.log('1. Connecting to MongoDB..')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Could Atlas!')

    // Khởi động Server Back-end sau khi Connect Database thành công
    START_SERVER()
  } catch (err) {
    console.error(err)
    process.exit(0)
  }
})()
