import express from 'express'

const app = express()

const hostname = 'localhost'
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}`)
})
