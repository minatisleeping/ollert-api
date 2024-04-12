import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'
import { columnRoute } from './columnRoute'
import { cardRoute } from './cardRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'API_v1 is ready to use!' })
})

// Boards APIs
Router.use('/boards', boardRoute)

// Columns APIs
Router.use('/columns', columnRoute)

// Cards APIs
Router.use('/cards', cardRoute)

export const API_v1 = Router
