/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

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

// console.log('1. Connecting to MongoDB...')
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB Could Atlas!'))
//   .then(() => START_SERVER())
//   .catch(err => {
//     console.error(err)
//     process.exit(0)
//   })
